import { type RegExpAnchorOptions, type RegExpCaptureOptions, type RegExpFlagOptions } from "@rsc-utils/core-utils";
type UrlType = "channel" | "message";
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & {
    type: UrlType;
};
export declare function getDiscordUrlRegex(options?: Options): RegExp;
export {};
