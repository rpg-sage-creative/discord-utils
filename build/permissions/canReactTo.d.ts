import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { SupportedChannel } from "../types/typeGuards/isSupported.js";
export declare function canReactTo(botId: Snowflake, channel: Optional<SupportedChannel>): boolean;
