import { getOrCreateRegex } from "@rsc-utils/core-utils";
/** Reusable function for ensuring consistent regex creation. */
function createDiscordEmojiRegex(options) {
    const { animated = "optional", gFlag = "", iFlag = "i" } = options ?? {};
    const flags = `${gFlag}${iFlag}`;
    // default to optional
    let a = "a?";
    if (animated === true) {
        a = "a";
    }
    else if (animated === false) {
        a = "";
    }
    return new RegExp(`<${a}:\\w{2,}:\\d{16,}>`, flags);
}
/**
 * Returns an instance of the discord emoji regexp.
 * If gFlag is passed, a new regexp is created.
 * If gFlag is not passed, a cached version of the regexp is used.
 * Default options: { animated:"optional", gFlag:"", iFlag:"i" }
 */
export function getDiscordEmojiRegex(options) {
    return getOrCreateRegex(createDiscordEmojiRegex, options);
}
