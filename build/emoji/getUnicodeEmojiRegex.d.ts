import { type RegExpAnchorOptions, type RegExpCaptureOptions, type RegExpFlagOptions, type RegExpQuantifyOptions } from "@rsc-utils/core-utils";
type Options = RegExpFlagOptions & RegExpAnchorOptions & RegExpCaptureOptions & RegExpQuantifyOptions;
/**
 * Returns an instance of the unicode emoji regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { anchored:false, capture:undefined, gFlag:"", iFlag:"", quantifier:"" }
 */
export declare function getUnicodeEmojiRegex(options?: Options): RegExp;
export {};
