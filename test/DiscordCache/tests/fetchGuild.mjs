import { assert, debug } from "@rsc-utils/core-utils";
import { DiscordCache, toHumanReadable } from "../../../build/index.js";
import { IDS } from "../DiscordCache.mjs";

/**
 * @param {DiscordCache} discordCache
 * @param {IDS} ids
 */
export async function test_fetchGuild(discordCache, { GUILD_ID }) {

	const startThree = Date.now();
	const guildThree = await discordCache.client.guilds.fetch(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guildThree);
	const stopThree = Date.now();

	const startOne = Date.now();
	const guildOne = await discordCache.fetchGuild(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guildOne);
	const stopOne = Date.now();

	discordCache.clear();

	const startTwo = Date.now();
	const guildTwo = await discordCache.fetchGuild(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guildTwo);
	const stopTwo = Date.now();

	debug({
		one: { label:"DiscordCache.fetch", ms:stopOne-startOne },
		two: { label:"DiscordCache.cache", ms:stopTwo-startTwo },
		three: { label:"DiscordJS.fetch", ms:stopThree-startThree },
	});
}
