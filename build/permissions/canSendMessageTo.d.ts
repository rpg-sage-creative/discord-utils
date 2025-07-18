import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
/**
 * Determines if we can send messages to the given channel.
 * If not a text channel, always false.
 * If a DM channel, always true.
 * If a locked or unarchivable thread, return false.
 * Otherwise, we check the bot's perms to see if it has SEND_MESSAGES or SEND_MESSAGES_IN_THREADS as appropriate.
 * @returns true if we can send to the channel
 */
export declare function canSendMessageTo(botId: Snowflake, channel: Optional<Channel>): boolean;
