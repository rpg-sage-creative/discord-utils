import { getEmbedLength } from "./getEmbedLength.js";
export function getTotalEmbedLength(embeds) {
    return embeds?.reduce((total, embed) => total + getEmbedLength(embed), 0) ?? 0;
}
