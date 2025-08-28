import type { GuildMember } from "discord.js";
import type { SupportedGameChannel } from "../types/index.js";
type BlockResults = {
    /** Could Sage manage the channel? */
    canManageChannel: boolean;
    /** Could Sage see the channel? */
    canViewChannel: boolean;
    /** was member blocked before the edit */
    blockedBefore?: boolean;
    /** was an edit attempted? */
    fixAttempted?: boolean;
    /** was there a successful edit */
    fixSuccess?: boolean;
    /** is member blocked after the edit */
    blockedAfter?: boolean;
    /** regardless of changes, is the member blocked? */
    blockCorrect: boolean;
};
/** Blocks the given target from the given channel. */
export declare function blockFromChannel(sage: GuildMember, channel: SupportedGameChannel, memberToBlock: GuildMember): Promise<BlockResults>;
export {};
