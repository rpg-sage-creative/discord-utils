import { getOrCreateRegex } from "@rsc-utils/core-utils";
import { getDiscordEmojiRegex } from "./getDiscordEmojiRegex.js";
import { getUnicodeEmojiRegex } from "./getUnicodeEmojiRegex.js";
function createEmojiRegex(options) {
    const { animated = "optional", gFlag = "", iFlag = "i" } = options ?? {};
    const flags = `${gFlag}${iFlag}u`;
    const discordEmojiRegex = getDiscordEmojiRegex({ animated, iFlag });
    const unicodeEmojiRegex = getUnicodeEmojiRegex({ iFlag });
    return new RegExp(`(?:${discordEmojiRegex.source})|(?:${unicodeEmojiRegex.source})`, flags);
}
export function getEmojiRegex(options) {
    return getOrCreateRegex(createEmojiRegex, options);
}
