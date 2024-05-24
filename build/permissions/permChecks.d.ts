import type { Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/core-utils";
import type { DChannel } from "../types.js";
/**
 * Determines if we can send messages to the given channel.
 * If not a text channel, always false.
 * If a DM channel, always true.
 * If a locked or unarchivable thread, return false.
 * Otherwise, we check the bot's perms to see if it has SEND_MESSAGES or SEND_MESSAGES_IN_THREADS as appropriate.
 * @returns true if we can send to the channel
 */
export declare function canSendMessageTo(botId: Snowflake, channel: Optional<DChannel>): boolean;
export declare function canReactTo(botId: Snowflake, channel: Optional<DChannel>): boolean;
export declare function canWebhookTo(botId: Snowflake, channel: Optional<DChannel>): boolean;
