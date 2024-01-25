import { isNonNilSnowflake } from "@rsc-utils/snowflake-utils";
import { createMentionRegex } from "./createMentionRegex.js";
import { createUrlRegex } from "./createUrlRegex.js";
function getGroupKey(type) {
    switch (type) {
        case "channel": return "channelId";
    }
}
function getMentionKey(type) {
    switch (type) {
        case "channel": return "channels";
    }
}
function getContentMentionIds(type, content) {
    if (content) {
        const globalRegex = createMentionRegex(type, { globalFlag: true });
        const mentions = content.match(globalRegex) ?? [];
        if (mentions.length) {
            const regex = createMentionRegex(type);
            return mentions.map(mention => regex.exec(mention)?.groups?.[getGroupKey(type)]);
        }
    }
    return [];
}
function getContentUrlIds(type, content) {
    if (content) {
        const globalRegex = createUrlRegex(type, { globalFlag: true });
        const urls = content.match(globalRegex) ?? [];
        if (urls.length) {
            const regex = createUrlRegex(type);
            return urls.map(url => regex.exec(url)?.groups?.[getGroupKey(type)]);
        }
    }
    return [];
}
function uniqueNonNilSnowflakeFilter(value, index, array) {
    return array.indexOf(value) === index && isNonNilSnowflake(value);
}
export function parseIds(message, type) {
    const contentMentionIds = getContentMentionIds(type, message.content);
    const contentUrlIds = getContentUrlIds(type, message.content);
    const mentionIds = message.mentions[getMentionKey(type)].map(mention => mention.id);
    return [...contentMentionIds, ...contentUrlIds, ...mentionIds].filter(uniqueNonNilSnowflakeFilter);
}
