export function canCheckPermissionsFor(channel) {
    return channel ? "permissionsFor" in channel : false;
}
export function canFetchWebhooksFor(channel) {
    return channel ? "fetchWebhooks" in channel : false;
}
export function isDMBased(channel) {
    return channel ? ("recipient" in channel) || ("recipients" in channel) : false;
}
export function isGuildBased(channel) {
    const types = ["GUILD_TEXT", "GUILD_PRIVATE_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_FORUM"];
    return types.includes(channel?.type);
}
export function isThread(channel) {
    if (channel?.isThread()) {
        return isGuildBased(channel.parent);
    }
    return false;
}
