import { URL } from "node:url";
export function isDiscordAttachmentCdnUrl(value) {
    if (!value)
        return false;
    const url = new URL(value);
    return url
        && (url.host === "cdn.discordapp.com" || url.host === "media.discordapp.net")
        && url.pathname.startsWith("/attachments/")
        && url.searchParams.has("ex")
        && url.searchParams.has("is")
        && url.searchParams.has("hm")
        ? true
        : false;
}
