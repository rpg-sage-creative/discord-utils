import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { Channel, Message } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolveSnowflake.js";
export type ChannelIdResolvable = SnowflakeResolvable | Channel | Message;
export type CanBeChannelIdResolvable = ChannelIdResolvable | CanBeSnowflakeResolvable | DiscordKey;
/** Resolves to Snowflake. */
export declare function resolveChannelId(resolvable: ChannelIdResolvable): Snowflake;
/** Resolves to Snowflake or undefined. */
export declare function resolveChannelId(resolvable: Optional<CanBeChannelIdResolvable>): OrUndefined<Snowflake>;
