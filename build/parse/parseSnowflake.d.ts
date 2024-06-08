import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
/** A convenient method for grabbing the first Snowflake present in the string. */
export declare function parseSnowflake(value: Optional<string>): Snowflake | null;
