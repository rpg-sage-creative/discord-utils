import { getTotalEmbedLength } from "../embed/getTotalEmbedLength.js";
import { validateEmbedLengths } from "../embed/validateEmbedLengths.js";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
export function validateMessageOptions(options) {
    const contentLength = options.content?.length ?? 0;
    if (contentLength > DiscordMaxValues.message.contentLength) {
        return false;
    }
    const embeds = options.embeds ?? [];
    if (embeds.length > DiscordMaxValues.message.embedCount) {
        return false;
    }
    const embedTotalLength = getTotalEmbedLength(embeds);
    if (embedTotalLength > DiscordMaxValues.embed.totalLength) {
        return false;
    }
    for (const embed of embeds) {
        if (!validateEmbedLengths(embed)) {
            return false;
        }
    }
    return true;
}
