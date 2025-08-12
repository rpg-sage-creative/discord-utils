export function isNonThreadGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === 0
            || channel.type === 4
            || channel.type === 15;
    }
    return false;
}
