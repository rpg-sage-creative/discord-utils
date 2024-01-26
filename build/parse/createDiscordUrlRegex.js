import { wrap } from "@rsc-utils/string-utils";
export function createDiscordUrlRegex(type, options) {
    const capture = options?.capture;
    const flags = options?.globalFlag ? "gi" : "i";
    let regex = "";
    switch (type) {
        case "channel":
            regex = /https:\/\/discord\.com\/channels\/(?<guildId>@me|\d{16,})\/(?<channelId>\d{16,})(?![/\d])/.source;
            break;
        case "message":
            regex = /https:\/\/discord\.com\/channels\/(?<guildId>@me|\d{16,})\/(?<channelId>\d{16,})\/(?<messageId>\d{16,})/.source;
            break;
    }
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
