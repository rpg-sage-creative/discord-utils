import { PermissionFlagsBits, type Channel, type GuildMember, type GuildMemberResolvable, type PermissionResolvable, type Role, type RoleResolvable } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
import { canCheckPermissionsFor, canFetchWebhooksFor, isGuildBased, isThread as isThreadChannel } from "../types/typeChecks.js";
import { type WebhookChannel } from "../types/types.js";

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

	/** Only returned if canSendWebhooks === true; the channel or thread parent that has webhooks */
	webhookChannel?: WebhookChannel;

	canSendPolls: boolean;
};

function emptyResults(): AccessResults {
	return {
		canManageChannel: false,
		canManageWebhooks: false,
		canViewChannel: false,
		isInChannel: false,
		canSendMessages: false,
		canAddReactions: false,
		canSendWebhooks: false,
		canSendPolls: false
	};
}

type CheckedResults = AccessResults & {
	/** the perms checked */
	checked: PermissionResolvable[];

	/** missing.length > 0 */
	// hasMissing: boolean;

	/** presnt.length > 0 */
	// hasPresent: boolean;

	/** the perms not found */
	missing: PermissionResolvable[];

	/** the perms found */
	present: PermissionResolvable[];
};

type GuildMemberOrRoleResolvable = GuildMember | GuildMemberResolvable | Role | RoleResolvable;

/** A quick check to see if a member or role can view or manage a channel. */
export function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable): AccessResults;

/** Checks the user/role and channel to see which of the given permissions are missing or present. */
export function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable, ...permsToCheck: PermissionResolvable[]): CheckedResults;

export function getPermsFor(channel: Channel, memberOrRole?: GuildMemberOrRoleResolvable, ...checked: PermissionResolvable[]): AccessResults | CheckedResults {
	const memberOrRoleId = resolveSnowflake(memberOrRole);

	// return false if member or channel are not valid
	if (!memberOrRoleId || !isGuildBased(channel)) {
		return emptyResults();
	}

	// check for thread and ensure we have the correct channel for perms checking
	const isThread = isThreadChannel(channel);
	const channelWithPerms = isThread ? channel.parent : channel;
	if (!canCheckPermissionsFor(channelWithPerms)) {
		return emptyResults();
	}

	const perms = channelWithPerms?.permissionsFor(memberOrRoleId);
	const canManageChannel = perms?.has(PermissionFlagsBits.ManageChannels) ?? false;
	const canManageWebhooks = perms?.has(PermissionFlagsBits.ManageWebhooks) ?? false;
	const canViewChannel = perms?.has(PermissionFlagsBits.ViewChannel) ?? false;
	const isInChannel = isThread ? channel.guildMembers.has(memberOrRoleId) : channel.members.has(memberOrRoleId);
	const canSendMessages = perms?.has(isThread ? PermissionFlagsBits.SendMessagesInThreads : PermissionFlagsBits.SendMessages) ?? false;
	const canAddReactions = perms?.has(PermissionFlagsBits.AddReactions) ?? false;
	const canSendWebhooks = canManageWebhooks && canFetchWebhooksFor(channelWithPerms);
	const webhookChannel = canSendWebhooks ? channelWithPerms : undefined;
	const canSendPolls = perms?.has(PermissionFlagsBits.SendPolls) ?? false;

	if (arguments.length < 3) {
		return { canManageChannel, canManageWebhooks, canViewChannel, isInChannel, canSendMessages, canAddReactions, canSendWebhooks, webhookChannel, canSendPolls };
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
		webhookChannel,
		canSendPolls,
		checked,
		missing,
		// hasMissing,
		present,
		// hasPresent,
	};
}