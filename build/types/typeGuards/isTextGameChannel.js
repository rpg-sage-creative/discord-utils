export function isTextGameChannel(channel) {
    if (channel && "isThread" in channel) {
        return channel.type === 0
            || channel.type === 11
            || channel.type === 12;
    }
    return false;
}
