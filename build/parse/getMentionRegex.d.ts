import { type RegExpAnchorOptions, type RegExpCaptureOptions, type RegExpFlagOptions } from "@rsc-utils/core-utils";
type MentionType = "channel" | "role" | "user";
type Options = RegExpFlagOptions & RegExpCaptureOptions & RegExpAnchorOptions & {
    type: MentionType;
};
export declare function getMentionRegex(options?: Options): RegExp;
export {};
