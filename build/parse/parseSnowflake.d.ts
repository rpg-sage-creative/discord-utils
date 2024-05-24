import type { Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/core-utils";
/** A convenient method for grabbing the first Snowflake present in the string. */
export declare function parseSnowflake(value: Optional<string>): Snowflake | null;
