import { isNonNilSnowflake } from "@rsc-utils/core-utils";
import { getDiscordUrlRegex } from "./getDiscordUrlRegex.js";
import { getMentionRegex } from "./getMentionRegex.js";
/** Validate MentionIdType */
function isMentionIdType(type) {
    return ["channel", "role", "user"].includes(type);
}
/** Validate UrlIdType */
function isUrlIdType(type) {
    return ["channel", "message"].includes(type);
}
/** Get GroupKey for the IdType */
function getGroupKey(type) {
    switch (type) {
        case "channel": return "channelId";
        case "message": return "messageId";
        case "role": return "roleId";
        case "user": return "userId";
    }
}
/** Get the proper Collection key for the MentionIdType */
function getMentionKey(type) {
    switch (type) {
        case "channel": return "channels";
        case "role": return "roles";
        case "user": return "users";
    }
}
/** Parses the content for mentions of the given IdType and returns the id/snowflakes. */
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
/** Gets the ids from the Collection for the given IdType. */
function getMessageMentionIds(type, message) {
    if (isMentionIdType(type)) {
        const collection = message.mentions[getMentionKey(type)];
        return collection.map(mention => mention.id);
    }
    return [];
}
/** Parses the content for urls of the given IdType and returns the ids/snowflakes. */
function getContentUrlIds(type, content) {
    if (isUrlIdType(type) && content) {
        // use global regex to get an array of urls
        const globalRegex = getDiscordUrlRegex({ gFlag: "g", type });
        const urls = content.match(globalRegex);
        if (urls?.length) {
            // use capture regex to parse each individual url
            const regex = getDiscordUrlRegex({ capture: type, type });
            const groupKey = getGroupKey(type);
            return urls.map(url => regex.exec(url)?.groups?.[groupKey]);
        }
    }
    return [];
}
/** A filter that only returns unique nonNil snowflakes. */
function uniqueNonNilSnowflakeFilter(value, index, array) {
    return isNonNilSnowflake(value) && array.indexOf(value) === index;
}
const RawSnowflakeRegExpG = /\b\d{16,}\b/g;
/** Returns all unique nonNil Snowflakes of the given IdType from the given Message. */
export function parseIds(messageOrContent, type, includeRaw) {
    const isString = typeof (messageOrContent) === "string";
    const content = isString ? messageOrContent : messageOrContent.content;
    const message = isString ? undefined : messageOrContent;
    const contentMentionIds = getContentMentionIds(type, content);
    const contentUrlIds = getContentUrlIds(type, content);
    const mentionIds = message ? getMessageMentionIds(type, message) : [];
    const rawIds = includeRaw ? content?.match(RawSnowflakeRegExpG) ?? [] : [];
    return contentMentionIds.concat(contentUrlIds, mentionIds, rawIds).filter(uniqueNonNilSnowflakeFilter);
}
