export function isGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === 0
            || channel.type === 4
            || channel.type === 11
            || channel.type === 12
            || channel.type === 15;
    }
    return false;
}
