import { getOrCreateRegex } from "@rsc-utils/core-utils";
function createDiscordUrlRegex(options) {
    const { capture, gFlag = "", iFlag = "", type = "message" } = options ?? {};
    const flags = `${gFlag}${iFlag}`;
    switch (type) {
        case "channel":
            return capture
                ? new RegExp(`https://discord\\.com/channels/(?<guildId>@me|\\d{16,})/(?<channelId>\\d{16,})(?![/\\d])`, flags)
                : new RegExp(`https://discord\\.com/channels/(?:@me|\\d{16,})/\\d{16,}(?![/\\d])`, flags);
        case "message":
            return capture
                ? new RegExp(`https://discord\\.com/channels/(?<guildId>@me|\\d{16,})/(?<channelId>\\d{16,})/(?<messageId>\\d{16,})`, flags)
                : new RegExp(`https://discord\\.com/channels/(?:@me|\\d{16,})/\\d{16,}/\\d{16,}`, flags);
    }
}
export function getDiscordUrlRegex(options) {
    return getOrCreateRegex(createDiscordUrlRegex, options);
}
