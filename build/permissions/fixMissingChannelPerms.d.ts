import type { GuildMember, PermissionFlagsBits } from "discord.js";
import type { SupportedCategoryChannel, SupportedGameChannel } from "../types/index.js";
type PermFlagBitsKeys = keyof typeof PermissionFlagsBits;
type FixPermResults = {
    /** Could Sage manage the channel? */
    canManageChannel: boolean;
    /** Could Sage see the channel? */
    canViewChannel: boolean;
    /** perms missing before the edit */
    missingBefore?: PermFlagBitsKeys[];
    /** was an edit attempted? */
    fixAttempted?: boolean;
    /** was there a successful edit? */
    fixSuccess?: boolean;
    /** perms missing after the edit */
    missingAfter?: PermFlagBitsKeys[];
    /** regardless of changes, are the final perms correct? */
    permsCorrect: boolean;
};
/** Checks the given channel to see what perms are missing. */
export declare function fixMissingChannelPerms(botGuildMember: GuildMember, channel: SupportedGameChannel | SupportedCategoryChannel): Promise<FixPermResults>;
export {};
