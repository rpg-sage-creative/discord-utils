import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
import { getEmbedLength } from "./getEmbedLength.js";
import { getTotalEmbedLength } from "./getTotalEmbedLength.js";
export function pushIfValid(embeds, embed) {
    if (embed) {
        const currentLength = getTotalEmbedLength(embeds);
        const length = getEmbedLength(embed);
        if (currentLength + length < DiscordMaxValues.embed.totalLength) {
            embeds.push(embed);
            return true;
        }
    }
    return false;
}
