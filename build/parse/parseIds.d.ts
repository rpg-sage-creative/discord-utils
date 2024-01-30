import { type Snowflake } from "@rsc-utils/snowflake-utils";
import { type DMessage } from "../types.js";
type IdType = "channel";
export declare function parseIds(message: DMessage, type: IdType): Snowflake[];
export {};
