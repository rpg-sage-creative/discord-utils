import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { Role } from "discord.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolveSnowflake.js";
export type RoleIdResolvable = SnowflakeResolvable | Role;
export type CanBeRoleIdResolvable = RoleIdResolvable | CanBeSnowflakeResolvable;
/** Resolves to Snowflake. */
export declare function resolveRoleId(resolvable: RoleIdResolvable): Snowflake;
/** Resolves to Snowflake or undefined. */
export declare function resolveRoleId(resolvable: Optional<CanBeRoleIdResolvable>): OrUndefined<Snowflake>;
