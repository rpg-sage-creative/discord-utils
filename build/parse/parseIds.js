import { isNonNilSnowflake } from "@rsc-utils/core-utils";
import { getDiscordUrlRegex } from "./getDiscordUrlRegex.js";
import { getMentionRegex } from "./getMentionRegex.js";
function isMentionIdType(type) {
    return ["channel", "role", "user"].includes(type);
}
function isUrlIdType(type) {
    return ["channel", "message"].includes(type);
}
function getGroupKey(type) {
    switch (type) {
        case "channel": return "channelId";
        case "message": return "messageId";
        case "role": return "roleId";
        case "user": return "userId";
    }
}
function getMentionKey(type) {
    switch (type) {
        case "channel": return "channels";
        case "role": return "roles";
        case "user": return "users";
    }
}
function getContentMentionIds(type, content) {
    if (isMentionIdType(type) && content) {
        const globalRegex = getMentionRegex(type, true);
        const mentions = content.match(globalRegex);
        if (mentions?.length) {
            const regex = getMentionRegex(type);
            return mentions.map(mention => regex.exec(mention)?.groups?.[getGroupKey(type)]);
        }
    }
    return [];
}
function getMessageMentionIds(type, message) {
    if (isMentionIdType(type)) {
        const collection = message.mentions[getMentionKey(type)];
        return collection.map(mention => mention.id);
    }
    return [];
}
function getContentUrlIds(type, content) {
    if (isUrlIdType(type) && content) {
        const globalRegex = getDiscordUrlRegex({ gFlag: "g", type });
        const urls = content.match(globalRegex) ?? [];
        if (urls.length) {
            const regex = getDiscordUrlRegex({ type });
            return urls.map(url => regex.exec(url)?.groups?.[getGroupKey(type)]);
        }
    }
    return [];
}
function uniqueNonNilSnowflakeFilter(value, index, array) {
    return isNonNilSnowflake(value) && array.indexOf(value) === index;
}
const RawSnowflakeRegExpG = /\b\d{16,}\b/g;
export function parseIds(messageOrContent, type, includeRaw) {
    const isString = typeof (messageOrContent) === "string";
    const content = isString ? messageOrContent : messageOrContent.content;
    const message = isString ? undefined : messageOrContent;
    const contentMentionIds = getContentMentionIds(type, content);
    const contentUrlIds = getContentUrlIds(type, content);
    const mentionIds = message ? getMessageMentionIds(type, message) : [];
    const rawIds = includeRaw ? content?.match(RawSnowflakeRegExpG) ?? [] : [];
    return [...contentMentionIds, ...contentUrlIds, ...mentionIds, ...rawIds].filter(uniqueNonNilSnowflakeFilter);
}
