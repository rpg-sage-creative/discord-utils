import { PermissionFlagsBits, type Channel, type GuildMember, type GuildMemberResolvable, type Role, type RoleResolvable } from "discord.js";
import { type SupportedWebhookChannel } from "../types/typeGuards/isSupportedWebhookChannel.js";
type AccessResults = {
    /** perms.has("ManageChannels") */
    canManageChannel: boolean;
    /** perms.has("ManageWebhooks") */
    canManageWebhooks: boolean;
    /** perms.has("ViewChannel") */
    canViewChannel: boolean;
    /** is the member in the members list (has joined a thread) */
    isInChannel: boolean;
    /** perms.has("SendMessages") or perms.has("SendMessagesInThreads") */
    canSendMessages: boolean;
    /** perms.has("AddReactions") */
    canAddReactions: boolean;
    /** canManageWebhooks and "fetchWebhooks" in channel */
    canSendWebhooks: boolean;
    /** Only returned if canSendWebhooks === true; the channel or thread parent that has webhooks */
    webhookChannel?: SupportedWebhookChannel;
    canSendPolls: boolean;
};
type PermFlagBitsKeys = keyof typeof PermissionFlagsBits;
type CheckedResults = AccessResults & {
    /** the perms checked */
    checked: PermFlagBitsKeys[];
    /** missing.length > 0 */
    /** presnt.length > 0 */
    /** the perms not found */
    missing: PermFlagBitsKeys[];
    /** the perms found */
    present: PermFlagBitsKeys[];
};
type GuildMemberOrRoleResolvable = GuildMember | GuildMemberResolvable | Role | RoleResolvable;
/** A quick check to see if a member or role can view or manage a channel. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable): AccessResults;
/** Checks the user/role and channel to see which of the given permissions are missing or present. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable, ...permsToCheck: PermFlagBitsKeys[]): CheckedResults;
export {};
