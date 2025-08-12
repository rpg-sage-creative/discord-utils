export function isThreadGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === 11
            || channel.type === 12;
    }
    return false;
}
