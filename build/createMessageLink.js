export function createMessageLink(msgOrRef) {
    if ("messageId" in msgOrRef) {
        return `https://discord.com/channels/${msgOrRef.guildId}/${msgOrRef.channelId}/${msgOrRef.messageId}`;
    }
    return `https://discord.com/channels/${msgOrRef.guildId}/${msgOrRef.channelId}/${msgOrRef.id}`;
}
