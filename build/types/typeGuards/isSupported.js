export function hasSupportedParentChannel(channel) {
    if (!channel || !("parent" in channel) || !channel.parent)
        return false;
    return isSupportedParentChannel(channel.parent);
}
export function isSupportedParentChannel(channel) {
    if (!channel || !("type" in channel))
        return false;
    switch (channel.type) {
        case 0: return !channel.parent || isSupportedParentChannel(channel.parent);
        case 4: return true;
        case 15: return !channel.parent || isSupportedParentChannel(channel.parent);
        default: return false;
    }
}
export function isSupportedChannel(channel) {
    if (!channel || !("type" in channel))
        return false;
    switch (channel.type) {
        case 0: return !channel.parent || isSupportedParentChannel(channel.parent);
        case 1: return true;
        case 2: return !channel.parent || isSupportedParentChannel(channel.parent);
        case 11: return isSupportedParentChannel(channel.parent);
        case 12: return isSupportedParentChannel(channel.parent);
        case 15: return !channel.parent || isSupportedParentChannel(channel.parent);
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
    if (interaction.channel && !isSupportedChannel(interaction.channel))
        return false;
    if ("targetMessage" in interaction && !isSupportedChannel(interaction.targetMessage.channel))
        return false;
    if ("message" in interaction && interaction.message && !isSupportedChannel(interaction.message.channel))
        return false;
    return true;
}
export function isSupportedRepliableInteraction(interaction) {
    return isSupportedInteraction(interaction) && interaction.isRepliable();
}
