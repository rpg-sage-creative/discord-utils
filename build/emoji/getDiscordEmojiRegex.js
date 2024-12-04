import { getOrCreateRegex } from "@rsc-utils/core-utils";
function createDiscordEmojiRegex(options) {
    const { animated = "optional", gFlag = "", iFlag = "i" } = options ?? {};
    const flags = `${gFlag}${iFlag}`;
    let a = "a?";
    if (animated === true) {
        a = "a";
    }
    else if (animated === false) {
        a = "";
    }
    return new RegExp(`<${a}:\\w{2,}:\\d{16,}>`, flags);
}
export function getDiscordEmojiRegex(options) {
    return getOrCreateRegex(createDiscordEmojiRegex, options);
}
