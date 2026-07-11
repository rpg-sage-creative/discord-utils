type MentionType = "channel" | "role" | "user";
/** Returns a TypedRegExp with one of the following capture groups: channelId, roleId, or userId */
export declare function getMentionRegex(type: MentionType, global?: boolean): RegExp;
export {};
