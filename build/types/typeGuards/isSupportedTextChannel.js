import { ChannelType } from "discord.js";
import { isSupportedParentChannel } from "./isSupportedParentChannel.js";
export function isSupportedTextChannel(channel) {
    if (!channel)
        return false;
    switch (channel.type) {
        case ChannelType.DM: return true;
        case ChannelType.GuildText: return true;
        case ChannelType.PrivateThread: return isSupportedParentChannel(channel.parent);
        case ChannelType.PublicThread: return isSupportedParentChannel(channel.parent);
        default: return false;
    }
}
