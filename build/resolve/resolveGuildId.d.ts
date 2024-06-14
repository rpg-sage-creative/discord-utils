import type { Optional, OrUndefined } from "@rsc-utils/core-utils";
import type { GuildResolvable, Snowflake } from "discord.js";
/** Resolves to Snowflake. */
export declare function resolveGuildId(resolvable: GuildResolvable): Snowflake;
/** Resolves to Snowflake or undefined. */
export declare function resolveGuildId(resolvable: Optional<GuildResolvable>): OrUndefined<Snowflake>;
