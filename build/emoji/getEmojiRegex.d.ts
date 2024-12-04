import { type RegExpAnchorOptions, type RegExpCaptureOptions, type RegExpFlagOptions, type RegExpQuantifyOptions } from "@rsc-utils/core-utils";
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions & {
    animated?: boolean | "optional";
};
/**
 * Returns an instance of the emoji regexp.
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { animated:"optional", gFlag:"", iFlag:"i" }
 */
export declare function getEmojiRegex(options?: Options): RegExp;
export {};
