import { resolveEmbed } from "./resolveEmbed.js";
export function getEmbedFieldCount(resolvable) {
    if (resolvable) {
        const embed = resolveEmbed(resolvable);
        return embed.fields?.length ?? 0;
    }
    return 0;
}
