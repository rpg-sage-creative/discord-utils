import { Formatters } from "discord.js";
export function toChannelMention(id) {
    return id ? Formatters.channelMention(id) : null;
}
