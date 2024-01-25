import type { RegExpCreateOptions } from "@rsc-utils/string-utils";
type Options = RegExpCreateOptions & {
    animated?: boolean | "optional";
};
/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 * Uses default options: { globalFlag:false, quantifier:"", animated:"optional" }
 */
export declare function createEmojiRegex(): RegExp;
/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 */
export declare function createEmojiRegex(options: Options): RegExp;
export {};
