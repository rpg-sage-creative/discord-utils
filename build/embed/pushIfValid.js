import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
import { getEmbedLength } from "./getEmbedLength.js";
import { getTotalEmbedLength } from "./getTotalEmbedLength.js";
export function pushIfValid(array, ...embeds) {
    let pushed = 0;
    for (const embed of embeds) {
        if (embed && array.length < DiscordMaxValues.message.embedCount) {
            const currentLength = getTotalEmbedLength(array);
            const length = getEmbedLength(embed);
            if (currentLength + length < DiscordMaxValues.embed.totalLength) {
                array.push(embed);
                pushed++;
            }
        }
    }
    return pushed;
}
