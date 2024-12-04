import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
export declare function canWebhookTo(botId: Snowflake, channel: Optional<Channel>): boolean;
