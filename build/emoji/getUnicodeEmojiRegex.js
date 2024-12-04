import { getOrCreateRegex } from "@rsc-utils/core-utils";
import emojiRegex from "emoji-regex-xs";
function createUnicodeEmojiRegex(options) {
    const { gFlag = "", iFlag = "i" } = options ?? {};
    const flags = `${gFlag}${iFlag}u`;
    return new RegExp(emojiRegex(), flags);
}
export function getUnicodeEmojiRegex(options) {
    return getOrCreateRegex(createUnicodeEmojiRegex, options);
}
