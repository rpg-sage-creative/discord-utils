export function simplifyDiscordAttachmentUrl(url) {
    if (!url)
        return url;
    // app https://cdn.discordapp.com/attachments/1140421024777781340/1141450682545745930/opal.png
    // web https://media.discordapp.net/attachments/1140421024777781340/1141450682545745930/opal.png?width=211&height=211
    const appPrefix = "https://cdn.discordapp.com";
    const webPrefix = "https://media.discordapp.net";
    if (url.startsWith(webPrefix)) {
        const endIndex = url.includes("?") ? url.indexOf("?") : undefined;
        return appPrefix + url.slice(webPrefix.length, endIndex);
    }
    return url;
}
