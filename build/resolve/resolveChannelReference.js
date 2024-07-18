export function resolveChannelReference(resolvable) {
    if (resolvable) {
        let guildId;
        let channelId;
        if ("channelId" in resolvable) {
            ({ guildId, channelId } = resolvable);
        }
        else {
            guildId = "guildId" in resolvable ? resolvable.guildId : undefined;
            channelId = resolvable.id;
        }
        if (channelId) {
            return { guildId, channelId };
        }
    }
    return undefined;
}
