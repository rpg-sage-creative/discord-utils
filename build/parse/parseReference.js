import { unwrap } from "@rsc-utils/string-utils";
import { createDiscordUrlRegex } from "./createDiscordUrlRegex.js";
export function parseReference(url, type) {
    if (url) {
        const regex = createDiscordUrlRegex(type);
        const match = regex.exec(unwrap(url, "<>"));
        if (match?.groups) {
            let { guildId, channelId, messageId } = match.groups;
            if (guildId === "@me") {
                guildId = undefined;
            }
            return { guildId, channelId, messageId };
        }
    }
    return undefined;
}
