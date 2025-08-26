import { ChannelType } from "discord.js";
export function isSupportedParentChannel(channel) {
    if (!channel)
        return false;
    switch (channel.type) {
        case ChannelType.GuildCategory: return true;
        case ChannelType.GuildForum: return true;
        case ChannelType.GuildText: return true;
        default: return false;
    }
}
