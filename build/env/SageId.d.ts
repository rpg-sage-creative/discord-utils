import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import type { CanBeSnowflakeResolvable } from "../resolve/resolveSnowflake.js";
export declare function getSageId(): Snowflake;
export declare function isSageId(id: Optional<CanBeSnowflakeResolvable>): id is Snowflake;
