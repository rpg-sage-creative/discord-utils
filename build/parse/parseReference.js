import { unwrap } from "@rsc-utils/core-utils";
import { getDiscordUrlRegex } from "./getDiscordUrlRegex.js";
function parseString(url, type) {
    const regex = getDiscordUrlRegex({ anchored: true, capture: type, type });
    const match = regex.exec(unwrap(url, "<>"));
    if (match?.groups) {
        let { guildId, channelId, messageId } = match.groups;
        if (guildId === "@me") {
            guildId = undefined;
        }
        return { guildId, channelId, messageId };
    }
    return undefined;
}
function parseMessage(message) {
    return {
        guildId: message.guildId ?? undefined,
        channelId: message.channelId,
        messageId: message.id
    };
}
function parseChannel(channel) {
    return {
        guildId: "guildId" in channel ? channel.guildId ?? undefined : undefined,
        channelId: channel.id,
        messageId: undefined
    };
}
export function parseReference(value, type) {
    if (value) {
        if (typeof (value) === "string") {
            return parseString(value, type ?? "message");
        }
        if ("channelId" in value) {
            return parseMessage(value);
        }
        return parseChannel(value);
    }
    return undefined;
}
