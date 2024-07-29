import { embedLength } from "discord.js";
import {} from "./EmbedResolvable.js";
import { resolveEmbed } from "./resolveEmbed.js";
export function getEmbedLength(embed) {
    return embedLength(resolveEmbed(embed));
}
