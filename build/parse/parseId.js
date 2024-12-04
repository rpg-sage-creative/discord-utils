import { getDiscordUrlRegex } from "./getDiscordUrlRegex.js";
import { getMentionRegex } from "./getMentionRegex.js";
function getGroupKey(type) {
    switch (type) {
        case "channel": return "channelId";
        case "message": return "messageId";
        case "role": return "roleId";
        case "user":
        default: return "userId";
    }
}
export function parseId(value, type) {
    if (value) {
        const groupKey = getGroupKey(type);
        if (type !== "message") {
            const mentionRegex = getMentionRegex({ anchored: true, capture: type, type });
            const mentionMatch = mentionRegex.exec(value);
            if (mentionMatch?.groups?.[groupKey]) {
                return mentionMatch.groups[groupKey];
            }
        }
        if (type !== "role" && type !== "user") {
            const urlRegex = getDiscordUrlRegex({ capture: type, type });
            const urlMatch = urlRegex.exec(value);
            if (urlMatch?.groups?.[groupKey]) {
                return urlMatch.groups[groupKey];
            }
        }
    }
    return undefined;
}
