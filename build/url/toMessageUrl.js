function createUrl(guildId, channelId, messageId) {
    return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}/${messageId}`;
}
export function toMessageUrl(ref) {
    if ("messageId" in ref) {
        if (ref.messageId) {
            return createUrl(ref.guildId, ref.channelId, ref.messageId);
        }
    }
    else if (ref.id) {
        return createUrl(ref.guildId, ref.channelId, ref.id);
    }
    return null;
}
