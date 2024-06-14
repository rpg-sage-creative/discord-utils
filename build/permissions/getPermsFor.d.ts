import { type Channel, type GuildMember, type GuildMemberResolvable, type PermissionResolvable, type Role, type RoleResolvable } from "discord.js";
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
type CheckedResults = AccessResults & {
    /** the perms checked */
    checked: PermissionResolvable[];
    /** missing.length > 0 */
    /** presnt.length > 0 */
    /** the perms not found */
    missing: PermissionResolvable[];
    /** the perms found */
    present: PermissionResolvable[];
};
type GuildMemberOrRoleResolvable = GuildMember | GuildMemberResolvable | Role | RoleResolvable;
/** A quick check to see if a member or role can view or manage a channel. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable): AccessResults;
/** Checks the user/role and channel to see which of the given permissions are missing or present. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable, ...permsToCheck: PermissionResolvable[]): CheckedResults;
export {};
