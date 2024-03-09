import { type Snowflake } from "@rsc-utils/snowflake-utils";
import { type DMessage } from "../types.js";
type MentionIdType = "channel" | "role" | "user";
type UrlIdType = "channel" | "message";
type IdType = MentionIdType | UrlIdType;
/** Returns all unique nonNil Snowflakes of the given IdType from the given Message. */
export declare function parseIds(messageOrContent: DMessage | string, type: IdType, includeRaw?: boolean): Snowflake[];
export {};
