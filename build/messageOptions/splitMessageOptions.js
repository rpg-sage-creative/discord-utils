import { chunk } from "@rsc-utils/string-utils";
import { DiscordMaxValues } from "../DiscordMaxValues.js";
import { getEmbedLength } from "../embed/getEmbedLength.js";
import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
export function splitMessageOptions(options) {
    const { content, embeds, files, ...baseOptions } = options;
    const payloads = [];
    const contentChunks = content ? chunk(content, DiscordMaxValues.message.contentLength) : [];
    contentChunks.forEach(contentChunk => {
        payloads.push({
            content: contentChunk,
            embeds: [],
            ...baseOptions
        });
    });
    embeds?.forEach(embed => {
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
