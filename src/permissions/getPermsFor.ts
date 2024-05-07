import type { GuildBasedChannel, GuildMember, GuildMemberResolvable, Role, RoleResolvable } from "discord.js";
import type { ChannelPermissionString } from "./ChannelPermissionString.js";
import { canCheckPermissionsFor, canFetchWebhooksFor, isGuildBased } from "../typeChecks.js";

type AccessResults = {
	/** perms.has("MANAGE_CHANNELS") */
	canManageChannel: boolean;

	/** perms.has("MANAGE_WEBHOOKS") */
	canManageWebhooks: boolean;

	/** perms.has("VIEW_CHANNEL") */
	canViewChannel: boolean;

	/** is the member in the members list (has joined a thread) */
	isInChannel: boolean;

	/** perms.has("SEND_MESSAGES") or perms.has("SEND_MESSAGES_IN_THREADS") */
	canSendMessages: boolean;

	/** perms.has("ADD_REACTIONS") */
	canAddReactions: boolean;

	/** canManageWebhooks and "fetchWebhooks" in channel */
	canSendWebhooks: boolean;
};

type CheckedResults = AccessResults & {
	/** the perms checked */
	checked: ChannelPermissionString[];

	/** missing.length > 0 */
	// hasMissing: boolean;

	/** presnt.length > 0 */
	// hasPresent: boolean;

	/** the perms not found */
	missing: ChannelPermissionString[];

	/** the perms found */
	present: ChannelPermissionString[];
};

type GuildMemberOrRoleResolvable = GuildMember | GuildMemberResolvable | Role | RoleResolvable;

/** A quick check to see if a member or role can view or manage a channel. */
export function getPermsFor(channel: GuildBasedChannel, memberOrRole: GuildMemberOrRoleResolvable): AccessResults;

/** Checks the user/role and channel to see which of the given permissions are missing or present. */
export function getPermsFor(channel: GuildBasedChannel, memberOrRole: GuildMemberOrRoleResolvable, ...permsToCheck: ChannelPermissionString[]): CheckedResults;

export function getPermsFor(channel: GuildBasedChannel, memberOrRole?: GuildMemberOrRoleResolvable, ...checked: ChannelPermissionString[]): AccessResults | CheckedResults {
	// resolve an object to an id; use SageId when we don't have a member or role
	const memberId = typeof(memberOrRole) === "string" ? memberOrRole : memberOrRole?.id;
	// return false if member or channel are not valid
	if (!memberId || !isGuildBased(channel)) {
		return { canManageChannel:false, canManageWebhooks:false, canViewChannel:false, isInChannel:false, canSendMessages:false, canAddReactions:false, canSendWebhooks:false };
	}

	// check for thread and ensure we have the correct channel for perms checking
	const isThread = channel.isThread();
	const channelWithPerms = isThread ? channel.parent : channel;
	if (!canCheckPermissionsFor(channelWithPerms)) {
		return { canManageChannel:false, canManageWebhooks:false, canViewChannel:false, isInChannel:false, canSendMessages:false, canAddReactions:false, canSendWebhooks:false };
	}

	const perms = channelWithPerms?.permissionsFor(memberId);
	const canManageChannel = perms?.has("MANAGE_CHANNELS") ?? false;
	const canManageWebhooks = perms?.has("MANAGE_WEBHOOKS") ?? false;
	const canViewChannel = perms?.has("VIEW_CHANNEL") ?? false;
	const isInChannel = isThread ? channel.guildMembers.has(memberId) : channel.members.has(memberId);
	const canSendMessages = perms?.has(isThread ? "SEND_MESSAGES_IN_THREADS" : "SEND_MESSAGES") ?? false;
	const canAddReactions = perms?.has("ADD_REACTIONS") ?? false;
	const canSendWebhooks = canManageWebhooks && canFetchWebhooksFor(channelWithPerms);

	if (arguments.length < 3) {
		return { canManageChannel, canManageWebhooks, canViewChannel, isInChannel, canSendMessages, canAddReactions, canSendWebhooks };
	}

	const missing = perms ? checked.filter(perm => !perms.has(perm)) : checked.slice();
	// const hasMissing = missing.length > 0;
	const present = perms ? checked.filter(perm => perms.has(perm)) : [];
	// const hasPresent = present.length > 0;
	return {
		canManageChannel,
		canManageWebhooks,
		canViewChannel,
		isInChannel,
		canSendMessages,
		canAddReactions,
		canSendWebhooks,
		checked,
		missing,
		// hasMissing,
		present,
		// hasPresent,
	};
}