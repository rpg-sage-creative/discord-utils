import { type RegExpAnchorOptions, type RegExpCaptureOptions, type RegExpFlagOptions } from "@rsc-utils/core-utils";
type UrlType = "channel" | "message";
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & {
    type: UrlType;
};
/** @deprecated @todo rewrite this to not use getOrCreateRegex (see other regex using globalizeRegex) */
export declare function getDiscordUrlRegex(options?: Options): RegExp;
export {};
