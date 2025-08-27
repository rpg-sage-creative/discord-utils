function createUrl(guildId, channelId) {
    return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}
export function toChannelUrl(ref) {
    if (ref) {
        if ("channelId" in ref) {
            return createUrl(ref.guildId, ref.channelId);
        }
        if (!ref.isDMBased()) {
            return createUrl(ref.guildId, ref.id);
        }
        return createUrl(undefined, ref.id);
    }
    return undefined;
}
