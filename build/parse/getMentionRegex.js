import { getOrCreateRegex } from "@rsc-utils/core-utils";
function createMentionRegex(options) {
    const { capture, gFlag = "", iFlag = "", type = "user" } = options ?? {};
    const flags = `${gFlag}${iFlag}`;
    let prefix = "";
    switch (type) {
        case "channel":
            prefix = "#";
            break;
        case "role":
            prefix = "@&";
            break;
        case "user":
            prefix = "@\\!?";
            break;
    }
    return capture
        ? new RegExp(`<${prefix}(?<${type}Id>\\d{16,})>`, flags)
        : new RegExp(`<${prefix}\\d{16,}>`, flags);
}
export function getMentionRegex(options) {
    return getOrCreateRegex(createMentionRegex, options);
}
