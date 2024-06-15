import { type Optional, type OrUndefined, type Snowflake } from "@rsc-utils/core-utils";
import type { GuildMember, PartialUser, User } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolveSnowflake.js";
export type UserIdResolvable = SnowflakeResolvable | User | PartialUser | GuildMember;
export type CanBeUserIdResolvable = UserIdResolvable | CanBeSnowflakeResolvable | DiscordKey;
/** Resolves to Snowflake. */
export declare function resolveUserId(resolvable: UserIdResolvable): Snowflake;
/** Resolves to Snowflake or undefined. */
export declare function resolveUserId(resolvable: Optional<CanBeUserIdResolvable>): OrUndefined<Snowflake>;
