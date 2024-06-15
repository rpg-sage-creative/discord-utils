import { chunk, isNotBlank } from "@rsc-utils/string-utils";
import { resolveColor } from "discord.js";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
import { EmbedBuilder } from "../embed/EmbedBuilder.js";
import {} from "../embed/EmbedResolvable.js";
import { getEmbedLength } from "../embed/getEmbedLength.js";
import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
function getValueToAppend(value, newLine, title) {
    const titleOut = isNotBlank(value) && title ? "### " : "";
    const newLineOut = newLine ? "\n" : "";
    const valueOut = value?.trim() ?? "";
    return titleOut + newLineOut + valueOut;
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
    const contentEmbeds = contentToEmbeds(content, embeds?.[0].color ?? color);
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
export function splitMessageOptions(msgOptions, splitOptions) {
    const { components, content, embedContent, embeds, files, replyingTo, ...baseOptions } = msgOptions;
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
            payloads.push({});
        }
        payloads[0].components = components;
        payloads[0].files = files;
    }
    return payloads;
}
