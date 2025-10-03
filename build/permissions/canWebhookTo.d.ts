import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { SupportedChannel } from "../types/typeGuards/isSupported.js";
export declare function canWebhookTo(botId: Snowflake, channel: Optional<SupportedChannel>): boolean;
