import {} from "@rsc-utils/core-utils";
import {} from "discord.js";
import {} from "../DiscordKey.js";
function createUrl(guildId, channelId) {
    return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}
export function toChannelUrl(ref) {
    if ("channelId" in ref) {
        return createUrl(ref.guildId, ref.channelId);
    }
    if ("guildId" in ref && typeof (ref.guildId) === "string") {
        return createUrl(ref.guildId, ref.id);
    }
    return createUrl(null, ref.id);
}
