import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
type IdType = "channel" | "message" | "role" | "user";
export declare function parseId(value: Optional<string>, type: IdType): Snowflake | undefined;
export {};
