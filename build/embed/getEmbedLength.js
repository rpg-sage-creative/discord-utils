import { embedLength } from "discord.js";
import { resolveEmbed } from "./resolveEmbed.js";
export function getEmbedLength(embed) {
    if (!embed) {
        return 0;
    }
    const resolved = resolveEmbed(embed);
    if ("type" in resolved) {
        delete resolved.type;
    }
    return embedLength(resolved);
}
