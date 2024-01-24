import XRegExp from "xregexp";
import { RegExpCreateOptions } from "@rsc-utils/string-utils";
import { getDiscordEmojiRegexSource } from "./getDiscordEmojiRegexSource.js";
import { getUnicodeEmojiRegexSource } from "./getUnicodeEmojiRegexSource.js";

type Options = RegExpCreateOptions & {

};

/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 * Uses default options: { globalFlag:false, quantifier:"" }
 */
export function createDiscordEmojiRegex(): RegExp;

/**
 * Convenience for creating/sharing regex that matches discord emoji _and_ unicode emoji.
 */
export function createDiscordEmojiRegex(options: Options): RegExp;

export function createDiscordEmojiRegex(options?: Options): RegExp {
	const discordEmojiRegex = getDiscordEmojiRegexSource();
	const unicodeEmojiRegex = getUnicodeEmojiRegexSource();
	const regex = `(?:${discordEmojiRegex}|${unicodeEmojiRegex})`;
	const quantifier = options?.quantifier ?? "";
	const flags = options?.globalFlag ? "g" : "";
	if (options?.capture) {
		if (options.capture === true) {
			return XRegExp(`(${regex}${quantifier})`, flags);
		}
		return XRegExp(`(?<${options.capture}>${regex}${quantifier})`, flags);
	}
	return XRegExp(regex + quantifier, flags);
}
