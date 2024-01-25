import { wrap } from "@rsc-utils/string-utils";
export function createDiscordUrlRegex(options) {
    const capture = options?.capture;
    const flags = options?.globalFlag ? "gi" : "i";
    let regex = `https:\\/\\/discord\\.com\\/channels\\/(?:@me|\\d{16,})\\/(?:\\d{16,})(?:\\/(\\d{16,}))?`;
    if (!options?.globalFlag) {
        regex = wrap(regex, "^$");
    }
    if (capture) {
        if (capture === true) {
            return new RegExp(`(${regex})`, flags);
        }
        return new RegExp(`(?<${capture}>${regex})`, flags);
    }
    return new RegExp(regex, flags);
}
