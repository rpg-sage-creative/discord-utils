import { embedLength } from "discord.js";
import {} from "./EmbedResolvable.js";
import { resolveEmbed } from "./resolveEmbed.js";
export function getEmbedLength(embed) {
    const resolved = resolveEmbed(embed);
    delete resolved.type;
    return embedLength(resolved);
}
