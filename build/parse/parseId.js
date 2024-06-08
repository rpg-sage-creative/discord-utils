import {} from "@rsc-utils/core-utils";
import { createDiscordUrlRegex } from "./createDiscordUrlRegex.js";
import { createMentionRegex } from "./createMentionRegex.js";
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
            const mentionRegex = createMentionRegex(type, { anchored: true });
            const mentionMatch = mentionRegex.exec(value);
            if (mentionMatch?.groups?.[groupKey]) {
                return mentionMatch.groups[groupKey];
            }
        }
        if (type !== "role" && type !== "user") {
            const urlRegex = createDiscordUrlRegex(type);
            const urlMatch = urlRegex.exec(value);
            if (urlMatch?.groups?.[groupKey]) {
                return urlMatch.groups[groupKey];
            }
        }
    }
    return null;
}
