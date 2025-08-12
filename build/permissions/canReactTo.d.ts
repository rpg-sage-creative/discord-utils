import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { Channel, DMChannel } from "discord.js";
import type { TextGameChannel } from "../types/index.js";
export declare function canReactTo(botId: Snowflake, channel: Optional<Channel>): channel is TextGameChannel | DMChannel;
