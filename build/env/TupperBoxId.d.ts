import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import type { CanBeSnowflakeResolvable } from "../resolve/resolveSnowflake.js";
/** Returns the known id for Tupperbox. */
export declare function getTupperBoxId(): Snowflake;
/** Convenient test and type guard for: id === getTupperBoxId() */
export declare function isTupperBoxId(id: Optional<CanBeSnowflakeResolvable>): id is Snowflake;
