import { embedLength, type APIEmbed } from "discord.js";
import type { EmbedResolvable } from "./EmbedResolvable.js";
import { resolveEmbed } from "./resolveEmbed.js";

export function getEmbedLength(embed: EmbedResolvable): number {
	const resolved = resolveEmbed(embed);
	delete resolved.type;
	return embedLength(resolved as Omit<APIEmbed, "type">);
}