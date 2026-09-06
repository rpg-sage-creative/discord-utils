export function hasSupportedParentChannel(channel) {
    if (!channel || !("parent" in channel) || !channel.parent)
        return false;
    return isSupportedParentChannel(channel.parent);
}
export function isSupportedParentChannel(channel) {
    if (!channel || !("type" in channel))
        return false;
    switch (channel.type) {
        case 0: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildText
        case 4: return true; // ChannelType.GuildCategory
        case 15: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildForum
        default: return false;
    }
}
export function isSupportedChannel(channel) {
    if (!channel || !("type" in channel))
        return false;
    switch (channel.type) {
        case 0: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildText
        case 1: return true; // ChannelType.DM
        case 2: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildVoice
        case 11: return isSupportedParentChannel(channel.parent); // ChannelType.PublicThread
        case 12: return isSupportedParentChannel(channel.parent); // ChannelType.PrivateThread
        case 15: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildForum
        default: return false;
    }
}
export function isSupportedChannelOrParent(channel) {
    return isSupportedChannel(channel) || isSupportedParentChannel(channel);
}
export function isSupportedNonThreadChannel(channel) {
    return isSupportedChannel(channel) && !channel.isThread();
}
export function isSupportedThreadChannel(channel) {
    return isSupportedChannel(channel) && channel.isThread();
}
export function isSupportedMessagesChannel(channel) {
    return isSupportedChannel(channel) && "messages" in channel;
}
export function isSupportedGameChannel(channel) {
    return isSupportedChannel(channel) && !channel.isDMBased();
}
export function isSupportedGameMessagesChannel(channel) {
    return isSupportedChannel(channel) && !channel.isDMBased() && "messages" in channel;
}
export function isSupportedWebhookChannel(channel) {
    return isSupportedChannel(channel) && "fetchWebhooks" in channel;
}
export function isSupportedTarget(target) {
    if (!target)
        return false;
    if ("type" in target)
        return isSupportedMessagesChannel(target);
    return !target.partial;
}
export function isSupportedInteraction(interaction) {
    if (!interaction)
        return false;
    // all need a valid channel
    if (interaction.channel && !isSupportedChannel(interaction.channel))
        return false;
    // message context needs targetMessage to have a valid channel
    if ("targetMessage" in interaction && !isSupportedChannel(interaction.targetMessage.channel))
        return false;
    // select / button / modal need message to have a valid channel
    if ("message" in interaction && interaction.message && !isSupportedChannel(interaction.message.channel))
        return false;
    // otherwise ...
    return true;
}
export function isSupportedRepliableInteraction(interaction) {
    return isSupportedInteraction(interaction) && interaction.isRepliable();
}
