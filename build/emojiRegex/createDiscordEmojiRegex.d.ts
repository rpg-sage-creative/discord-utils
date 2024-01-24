import type { RegExpCreateOptions } from "@rsc-utils/string-utils";
type Options = RegExpCreateOptions & {};
/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 * Uses default options: { globalFlag:false, quantifier:"" }
 */
export declare function createDiscordEmojiRegex(): RegExp;
/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 */
export declare function createDiscordEmojiRegex(options: Options): RegExp;
export {};
