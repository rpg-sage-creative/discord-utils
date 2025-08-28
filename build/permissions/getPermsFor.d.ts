import type { Optional } from "@rsc-utils/core-utils";
import { PermissionFlagsBits, PermissionsBitField, type Channel, type GuildMember, type GuildMemberResolvable, type Role, type RoleResolvable } from "discord.js";
import { type SupportedWebhookChannel } from "../types/typeGuards/isSupported.js";
type PermissionsArgs = {
    checked?: PermFlagBitsKeys[];
    isInChannel?: boolean;
    isThread?: boolean;
    missing?: PermFlagBitsKeys[];
    perms?: Optional<PermissionsBitField>;
    present?: PermFlagBitsKeys[];
    webhookChannel?: Optional<SupportedWebhookChannel>;
};
declare class Permissions {
    /** the perms checked */
    checked: PermFlagBitsKeys[];
    /** is the member in the members list (has joined a thread) */
    isInChannel: boolean;
    /** is the channel actually a thread */
    isThread: boolean;
    /** the perms not found */
    missing: PermFlagBitsKeys[];
    /** the underlying permissions data */
    perms?: PermissionsBitField;
    /** the perms found */
    present: PermFlagBitsKeys[];
    /** the webhook channel (parent of a thread) */
    webhookChannel?: SupportedWebhookChannel;
    constructor({ checked, isInChannel, isThread, missing, perms, present, webhookChannel }?: PermissionsArgs);
    /** Tests to see if the requested permission is present */
    can(key: "SendTo" | "WebhookTo" | keyof typeof PermissionFlagsBits): boolean;
}
type PermFlagBitsKeys = keyof typeof PermissionFlagsBits;
type GuildMemberOrRoleResolvable = GuildMember | GuildMemberResolvable | Role | RoleResolvable;
/** A quick check to see if a member or role can view or manage a channel. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable): Permissions;
/** Checks the user/role and channel to see which of the given permissions are missing or present. */
export declare function getPermsFor(channel: Channel, memberOrRole: GuildMemberOrRoleResolvable, ...permsToCheck: PermFlagBitsKeys[]): Permissions;
export {};
