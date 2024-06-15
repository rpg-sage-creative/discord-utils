import { verbose } from "@rsc-utils/core-utils";
import type { Client, Guild } from "discord.js";
import { resolveGuildId, type GuildIdResolvable } from "../../resolve/resolveGuildId.js";
import { DiscordApiError } from "../../DiscordApiError.js";

/** @internal */
export async function fetchGuild(client: Client, guildIdResolvable: GuildIdResolvable): Promise<Guild | undefined> {
	const guildId = resolveGuildId(guildIdResolvable);
	if (!guildId) {
		return undefined;
	}

	verbose(`fetchGuild(${guildId})`);
	return client.guilds.fetch(guildId).catch(DiscordApiError.process);
}