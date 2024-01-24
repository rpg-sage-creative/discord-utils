import XRegExp from "xregexp";
import { getDiscordEmojiRegexSource } from "./getDiscordEmojiRegexSource.js";
import { getUnicodeEmojiRegexSource } from "./getUnicodeEmojiRegexSource.js";
export function createDiscordEmojiRegex(options) {
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
