import {} from "@rsc-utils/core-utils";
import { channelMention } from "discord.js";
export function toChannelMention(id) {
    return id ? channelMention(id) : null;
}
