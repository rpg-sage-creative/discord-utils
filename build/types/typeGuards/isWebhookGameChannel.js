export function isWebhookGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === 0
            || channel.type === 15;
    }
    return false;
}
