import {} from "@rsc-utils/string-utils";
export function createMentionRegex(type, options) {
    const capture = options?.capture;
    const flags = options?.globalFlag ? "g" : "";
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
    let regex = `<${prefix}(?<${type}Id>\\d{16,})>`;
    if (options?.anchored) {
        regex = `^${regex}$`;
    }
    if (capture) {
        if (capture === true) {
            return new RegExp(`(${regex})`, flags);
        }
        return new RegExp(`(?<${capture}>${regex})`, flags);
    }
    return new RegExp(regex, flags);
}
