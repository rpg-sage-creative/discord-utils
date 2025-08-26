import { ChannelType } from "discord.js";
export function isSupportedWebhookChannel(channel) {
    if (!channel || !("type" in channel))
        return false;
    switch (channel.type) {
        case ChannelType.GuildForum: return true;
        case ChannelType.GuildText: return true;
        default: return false;
    }
}
