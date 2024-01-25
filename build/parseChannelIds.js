import { isNonNilSnowflake, orNilSnowflake } from "@rsc-utils/snowflake-utils";
import { createDiscordUrlRegex } from "./createDiscordUrlRegex.js";
import { parseSnowflake } from "./parseSnowflake.js";
function contentToUrls(content) {
    if (content) {
        const regex = createDiscordUrlRegex({ globalFlag: true });
        return regex.exec(content) ?? [];
    }
    return [];
}
function splitUrl(url) {
    const [_http, _slash, _dotCom, _channels, server, channel, message] = url?.split("/") ?? [];
    return {
        server: orNilSnowflake(server),
        channel: orNilSnowflake(channel),
        message: orNilSnowflake(message)
    };
}
export function parseChannelIds(message) {
    const channelMentionIds = message.mentions.channels.map(channel => channel.id);
    const channelUrlIds = contentToUrls(message.content).map(splitUrl).map(url => url.channel);
    const channelReferenceIds = message.content?.match(/<#\d{16,}>/g)?.map(parseSnowflake) ?? [];
    return channelMentionIds
        .concat(channelUrlIds)
        .concat(channelReferenceIds)
        .filter((id, i, arr) => id && isNonNilSnowflake(id) && arr.indexOf(id) === i);
}
