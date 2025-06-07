import { chunk, isNotBlank } from "@rsc-utils/core-utils";
import { resolveColor } from "discord.js";
import { EmbedBuilder } from "../embed/EmbedBuilder.js";
import { getEmbedLength } from "../embed/getEmbedLength.js";
import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
import { resolveEmbed } from "../embed/resolveEmbed.js";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
function getValueToAppend(value, newLine, title) {
    const titleOut = isNotBlank(value) && title ? "### " : "";
    const newLineOut = newLine ? "\n" : "";
    const valueOut = value?.trim() ?? "";
    return titleOut + newLineOut + valueOut;
}
function embedsToContent(embeds) {
    const content = embeds?.map(_embed => {
        const embed = resolveEmbed(_embed);
        let text = "";
        text += getValueToAppend(embed.title, false, true);
        let newLine = text.length > 0;
        text += getValueToAppend(embed.description, newLine);
        newLine ||= text.length > 0;
        embed.fields?.forEach(field => {
            text += getValueToAppend(field.name, newLine, true);
            newLine ||= text.length > 0;
            text += getValueToAppend(field.value, newLine);
            newLine ||= text.length > 0;
        });
        return text;
    }).join("\n\n");
    return content?.trim()
        ? content
        : undefined;
}
function contentToEmbeds(content, colorResolvable) {
    const trimmedContent = content?.trim();
    if (trimmedContent?.length) {
        const chunks = chunk(trimmedContent, DiscordMaxValues.embed.descriptionLength);
        if (chunks.length) {
            const color = colorResolvable ? resolveColor(colorResolvable) : undefined;
            return chunks.map(description => new EmbedBuilder({ color, description }));
        }
    }
    return undefined;
}
function mergeContent(content, embeds) {
    const embedContent = embedsToContent(embeds);
    const hasContent = !!content?.trim();
    const hasEmbedContent = !!embedContent?.trim();
    if (hasContent && hasEmbedContent) {
        return `${content}\n\n${embedContent}`;
    }
    else if (hasEmbedContent) {
        return embedContent;
    }
    else if (hasContent) {
        return content;
    }
    return undefined;
}
function mergeEmbeds(content, embeds, color) {
    const hasEmbeds = !!embeds?.length;
    const embedColor = hasEmbeds ? resolveEmbed(embeds[0]).color : undefined;
    const contentEmbeds = contentToEmbeds(content, embedColor ?? color);
    const hasContentEmbeds = !!contentEmbeds?.length;
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
export function splitMessageOptions(msgOptions, splitOptions) {
    const { components, content, embedContent, embeds, files, replyingTo, ...baseOptions } = msgOptions;
    if ("username" in baseOptions) {
        const { username } = baseOptions;
        if (typeof (username) === "string") {
            if (username.length > DiscordMaxValues.webhook.username.maxLength) {
                baseOptions.username = `${username.slice(0, 79)}…`;
            }
        }
    }
    const convertedEmbeds = contentToEmbeds(embedContent, splitOptions?.embedColor) ?? [];
    const allIncomingEmbeds = convertedEmbeds.concat(embeds ?? []);
    let contentToChunk;
    let embedsToPost;
    if (splitOptions?.embedsToContent) {
        contentToChunk = mergeContent(content, allIncomingEmbeds);
    }
    else if (splitOptions?.contentToEmbeds) {
        embedsToPost = mergeEmbeds(content, allIncomingEmbeds, splitOptions.embedColor);
    }
    else {
        contentToChunk = content ?? undefined;
        embedsToPost = allIncomingEmbeds;
    }
    if (replyingTo && contentToChunk) {
        contentToChunk = `${replyingTo}\n\n${contentToChunk}`;
    }
    const payloads = [];
    const contentChunks = chunk(contentToChunk?.trim() ?? "", DiscordMaxValues.message.contentLength);
    contentChunks.forEach(contentChunk => {
        payloads.push({
            content: contentChunk,
            embeds: [],
            ...baseOptions
        });
    });
    let blankContent = (contentToChunk ? undefined : replyingTo) ?? splitOptions?.blankContentValue?.trim();
    if (!blankContent?.length) {
        blankContent = undefined;
    }
    embedsToPost?.forEach(embed => {
        const embedLength = getEmbedLength(embed);
        const payload = payloads[payloads.length - 1];
        if (payload) {
            const embedsLength = getTotalEmbedLength([...payload.embeds ?? []]);
            if (embedsLength + embedLength < DiscordMaxValues.embed.totalLength) {
                payload.embeds.push(embed);
            }
            else {
                payloads.push({ content: blankContent, embeds: [embed], ...baseOptions });
            }
        }
        else {
            payloads.push({ content: blankContent, embeds: [embed], ...baseOptions });
        }
    });
    if (components?.length || files?.length) {
        if (!payloads.length) {
            payloads.push({ ...baseOptions });
        }
        payloads[0].components = components;
        payloads[0].files = files;
    }
    return payloads;
}
