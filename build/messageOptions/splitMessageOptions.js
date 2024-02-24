import { chunk } from "@rsc-utils/string-utils";
import { MessageEmbed } from "discord.js";
import { DiscordMaxValues } from "../DiscordMaxValues.js";
import { getEmbedLength } from "../embed/getEmbedLength.js";
import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
function getValueToAppend(value, newLine, title) {
    return `${title ? "### " : ""}${newLine ? "\n" : ""}${value ?? ""}`;
}
function embedsToContent(embeds) {
    const content = embeds?.map(embed => {
        let text = "";
        text += getValueToAppend(embed.title, !!text, true);
        text += getValueToAppend(embed.description, !!text, false);
        if (embed.fields?.length) {
            embed.fields.forEach(field => {
                text += getValueToAppend(field.name, !!text, true);
                text += getValueToAppend(field.value, !!text, false);
            });
        }
        return text;
    }).join("\n\n");
    return content?.trim()
        ? content
        : undefined;
}
function contentToEmbeds(content) {
    const trimmedContent = content?.trim();
    if (trimmedContent?.length) {
        const chunks = chunk(trimmedContent, DiscordMaxValues.embed.descriptionLength);
        if (chunks.length) {
            return chunks.map(description => new MessageEmbed({ description }));
        }
    }
    return undefined;
}
function mergeContent(content, embeds) {
    const embedContent = embedsToContent(embeds);
    const hasContent = !!content?.trim();
    const hasEmbedContent = !!embedContent?.trim();
    if (hasContent && hasEmbedContent) {
        return `${content}\n\n${hasEmbedContent}`;
    }
    else if (hasEmbedContent) {
        return embedContent;
    }
    else if (hasContent) {
        return content;
    }
    return undefined;
}
function mergeEmbeds(content, embeds) {
    const contentEmbeds = contentToEmbeds(content);
    const hasContentEmbeds = !!contentEmbeds?.length;
    const hasEmbeds = !!embeds?.length;
    if (hasContentEmbeds && hasEmbeds) {
        return contentEmbeds.concat(embeds);
    }
    else if (hasContentEmbeds) {
        return contentEmbeds;
    }
    else if (hasEmbeds) {
        return embeds;
    }
    return undefined;
}
export function splitMessageOptions(msgOptions, convertOptions) {
    const { content, embeds, files, ...baseOptions } = msgOptions;
    let contentToChunk;
    let embedsToPost;
    if (convertOptions?.embedsToContent) {
        contentToChunk = mergeContent(content, embeds);
    }
    else if (convertOptions?.contentToEmbeds) {
        embedsToPost = mergeEmbeds(content, embeds);
    }
    else {
        contentToChunk = content ?? undefined;
        embedsToPost = embeds;
    }
    const contentChunks = contentToChunk?.trim()
        ? chunk(contentToChunk, DiscordMaxValues.message.contentLength)
        : [];
    const payloads = [];
    contentChunks.forEach(contentChunk => {
        payloads.push({
            content: contentChunk,
            embeds: [],
            ...baseOptions
        });
    });
    embedsToPost?.forEach(embed => {
        const embedLength = getEmbedLength(embed);
        const payload = payloads[payloads.length - 1];
        if (payload) {
            const embedsLength = getTotalEmbedLength(payload.embeds);
            if (embedsLength + embedLength < DiscordMaxValues.embed.totalLength) {
                payload.embeds.push(embed);
            }
            else {
                payloads.push({ embeds: [embed], ...baseOptions });
            }
        }
        else {
            payloads.push({ embeds: [embed], ...baseOptions });
        }
    });
    payloads[0].files = files;
    return payloads;
}
