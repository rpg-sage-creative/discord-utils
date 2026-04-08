export function simplifyDiscordAttachmentUrl(url) {
    if (!url)
        return url;
    const appPrefix = "https://cdn.discordapp.com";
    const webPrefix = "https://media.discordapp.net";
    if (url.startsWith(webPrefix)) {
        const endIndex = url.includes("?") ? url.indexOf("?") : undefined;
        return appPrefix + url.slice(webPrefix.length, endIndex);
    }
    return url;
}
