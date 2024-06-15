import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { GuildPreview, GuildResolvable } from "discord.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolveSnowflake.js";
export type GuildIdResolvable = GuildResolvable | GuildPreview | SnowflakeResolvable;
export type CanBeGuildIdResolvable = GuildIdResolvable | CanBeSnowflakeResolvable;
/** Resolves to Snowflake. */
export declare function resolveGuildId(resolvable: GuildIdResolvable): Snowflake;
/** Resolves to Snowflake or undefined. */
export declare function resolveGuildId(resolvable: Optional<CanBeGuildIdResolvable>): OrUndefined<Snowflake>;
