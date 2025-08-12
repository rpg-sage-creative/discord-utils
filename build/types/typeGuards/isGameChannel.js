import { ChannelType } from "discord.js";
export function isGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === ChannelType.GuildText
            || channel.type === ChannelType.GuildCategory
            || channel.type === ChannelType.GuildForum
            || channel.type === ChannelType.PublicThread
            || channel.type === ChannelType.PrivateThread;
    }
    return false;
}
