import createEmojiRegex from "emoji-regex";
export function getUnicodeEmojiRegexSource() {
    return createEmojiRegex().source;
}
