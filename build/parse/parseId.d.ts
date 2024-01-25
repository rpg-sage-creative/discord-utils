import { type Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/type-utils";
type IdType = "channel" | "message" | "role" | "user";
export declare function parseId(value: Optional<string>, type: IdType): Snowflake | null;
export {};
