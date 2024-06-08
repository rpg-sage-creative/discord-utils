import { isNonNilSnowflake } from "@rsc-utils/core-utils";
import {} from "discord.js";
import { createDiscordUrlRegex } from "./createDiscordUrlRegex.js";
import { createMentionRegex } from "./createMentionRegex.js";
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
        const globalRegex = createMentionRegex(type, { globalFlag: true });
        const mentions = content.match(globalRegex) ?? [];
        if (mentions.length) {
            const regex = createMentionRegex(type);
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
        const globalRegex = createDiscordUrlRegex(type, { globalFlag: true });
        const urls = content.match(globalRegex) ?? [];
        if (urls.length) {
            const regex = createDiscordUrlRegex(type);
            return urls.map(url => regex.exec(url)?.groups?.[getGroupKey(type)]);
        }
    }
    return [];
}
function uniqueNonNilSnowflakeFilter(value, index, array) {
    return isNonNilSnowflake(value) && array.indexOf(value) === index;
}
export function parseIds(messageOrContent, type, includeRaw) {
    const isString = typeof (messageOrContent) === "string";
    const content = isString ? messageOrContent : messageOrContent.content;
    const message = isString ? undefined : messageOrContent;
    const contentMentionIds = getContentMentionIds(type, content);
    const contentUrlIds = getContentUrlIds(type, content);
    const mentionIds = message ? getMessageMentionIds(type, message) : [];
    const rawIds = includeRaw ? (content ?? "").match(/\d{16,}/g) ?? [] : [];
    return [...contentMentionIds, ...contentUrlIds, ...mentionIds, ...rawIds].filter(uniqueNonNilSnowflakeFilter);
}
