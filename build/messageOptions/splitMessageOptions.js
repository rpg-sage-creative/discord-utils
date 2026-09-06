import { chunk, isNotBlank } from "@rsc-utils/core-utils";
import { resolveColor } from "discord.js";
import { EmbedBuilder } from "../embed/EmbedBuilder.js";
import { getEmbedLength } from "../embed/getEmbedLength.js";
import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
import { resolveEmbed } from "../embed/resolveEmbed.js";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
/** Ensures we have a string, prepending a NewLine or title markdown if needed. */
function getValueToAppend(value, newLine, title) {
    const titleOut = isNotBlank(value) && title ? "### " : "";
    const newLineOut = newLine ? "\n" : "";
    const valueOut = value?.trim() ?? "";
    return titleOut + newLineOut + valueOut;
}
/** Converts embeds into content. */
function embedsToContent(embeds) {
    // map the embeds to content and join them
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
    // return undefined if we have a blank string
    return content?.trim()
        ? content
        : undefined;
}
/** Converts content into embeds. */
function contentToEmbeds(content, colorResolvable) {
    const trimmedContent = content?.trim();
    if (trimmedContent?.length) {
        const chunks = chunk(trimmedContent, { maxChunkLength: DiscordMaxValues.embed.descriptionLength });
        if (chunks.length) {
            const color = colorResolvable ? resolveColor(colorResolvable) : undefined;
            return chunks.map(description => new EmbedBuilder({ color, description }));
        }
    }
    return undefined;
}
/** Merges embeds into content. */
function mergeContent(content, embeds) {
    // get embed content
    const embedContent = embedsToContent(embeds);
    // get has flags
    const hasContent = !!content?.trim();
    const hasEmbedContent = !!embedContent?.trim();
    // return non blank output
    if (hasContent && hasEmbedContent) {
        return `${content}\n\n${embedContent}`;
    }
    else if (hasEmbedContent) {
        return embedContent;
    }
    else if (hasContent) {
        return content;
    }
    // return undefined to avoid sending an empty string as content
    return undefined;
}
/** Merges content into embeds */
function mergeEmbeds(content, embeds, color) {
    const hasEmbeds = !!embeds?.length;
    // get content embeds
    const embedColor = hasEmbeds ? resolveEmbed(embeds[0]).color : undefined;
    const contentEmbeds = contentToEmbeds(content, embedColor ?? color);
    const hasContentEmbeds = !!contentEmbeds?.length;
    // return defined embeds
    if (hasContentEmbeds && hasEmbeds) {
        return contentEmbeds.concat(embeds);
    }
    else if (hasContentEmbeds) {
        return contentEmbeds;
    }
    else if (hasEmbeds) {
        return embeds;
    }
    // return undefined to avoid sending an invalid array
    return undefined;
}
/** Used to convert a single message options object into an array to ensure we don't break posting limits. */
export function splitMessageOptions(msgOptions, splitOptions) {
    // break out the content, embeds, and files; saving the remaining options to be used in each payload
    const { components, content, embedContent, embeds, files, replyingTo, ...baseOptions } = msgOptions;
    // let's do some name maintenance here ...
    if ("username" in baseOptions) {
        const { username } = baseOptions;
        if (typeof (username) === "string") {
            if (username.length > DiscordMaxValues.webhook.username.maxLength) {
                baseOptions.username = `${username.slice(0, 79)}…`;
            }
        }
    }
    // convert incoming embedContent to embeds
    const convertedEmbeds = contentToEmbeds(embedContent, splitOptions?.embedColor) ?? [];
    // merge those with other incoming embeds
    const allIncomingEmbeds = convertedEmbeds.concat(embeds ?? []);
    let contentToChunk;
    let embedsToPost;
    if (splitOptions?.embedsToContent) {
        // merge the incoming content with the embeds
        contentToChunk = mergeContent(content, allIncomingEmbeds);
    }
    else if (splitOptions?.contentToEmbeds) {
        // merge the content into the embeds
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
    // chunk content into valid lengths
    const contentChunks = chunk(contentToChunk?.trim() ?? "", { maxChunkLength: DiscordMaxValues.message.contentLength });
    // create a payload for each chunk
    contentChunks.forEach(contentChunk => {
        payloads.push({
            content: contentChunk,
            embeds: [],
            ...baseOptions
        });
    });
    // cannot send an empty string for content
    let blankContent = (contentToChunk ? undefined : replyingTo) ?? splitOptions?.blankContentValue?.trim();
    if (!blankContent?.length) {
        blankContent = undefined; //NOSONAR
    }
    // iterate the embeds
    embedsToPost?.forEach(embed => {
        // get the length of the embed to add
        const embedLength = getEmbedLength(embed);
        // grab the last payload to see if we can add to it
        const payload = payloads[payloads.length - 1];
        if (payload) {
            // get the length of the existing embeds
            const embedsLength = getTotalEmbedLength([...payload.embeds ?? []]);
            // if we have enough characters left, then add the add
            if (embedsLength + embedLength < DiscordMaxValues.embed.totalLength) {
                payload.embeds.push(embed);
                // create a new embed
            }
            else {
                payloads.push({ content: blankContent, embeds: [embed], ...baseOptions });
            }
            // no payload, create a new one
        }
        else {
            payloads.push({ content: blankContent, embeds: [embed], ...baseOptions });
        }
    });
    // only set components or files /if/ we have them
    if (components?.length || files?.length) {
        // if we somehow don't have a payload, add one
        if (!payloads.length) {
            payloads.push({ ...baseOptions });
        }
        // only include attachments in the first payload
        // payloads[0]!.attachments = attachments;
        // only include components in the first payload
        payloads[0].components = components;
        // only include files in the first payload
        payloads[0].files = files;
    }
    return payloads;
}
