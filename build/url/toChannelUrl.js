import {} from "@rsc-utils/core-utils";
import {} from "discord.js";
import { isGuildBased } from "../types/types.js";
function createUrl(guildId, channelId) {
    return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}
export function toChannelUrl(ref) {
    if (ref) {
        if ("channelId" in ref) {
            return createUrl(ref.guildId, ref.channelId);
        }
        if (isGuildBased(ref)) {
            return createUrl(ref.guildId, ref.id);
        }
        return createUrl(undefined, ref.id);
    }
    return undefined;
}
