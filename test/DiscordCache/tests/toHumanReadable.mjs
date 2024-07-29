import { assert } from "@rsc-utils/core-utils";
import { DiscordCache, toHumanReadable } from "../../../build/index.js";
import { IDS } from "../DiscordCache.mjs";

/**
 * @param {DiscordCache} discordCache
 * @param {IDS} ids
 */
export async function test_toHumanReadable(discordCache, { CHANNEL_ID, GUILD_ID, ROLE_ID, SUPER_USER_ID }) {

	const channel = await discordCache.fetchChannel({ channelId:CHANNEL_ID, guildId:GUILD_ID });
	assert("RPG Sage (Dev)#​pf2e-ic", toHumanReadable, channel);

	const guild = await discordCache.fetchGuild(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guild);

	const user = await discordCache.fetchUser(SUPER_USER_ID);
	assert("@​Randal", toHumanReadable, user);

	const guildMember = await discordCache.fetchGuildMember({ user:{id:SUPER_USER_ID}, guildId:GUILD_ID });
	assert("@​Randal", toHumanReadable, guildMember);

	const role = await discordCache.fetchGuildRole(ROLE_ID);
	assert("RPG Sage (Dev)#​Developer", toHumanReadable, role);

	const webhook = await discordCache.fetchWebhook({ channelId:CHANNEL_ID, guildId:GUILD_ID });
	assert("@​RPG Sage (Dev)$SageDialogWebhookName", toHumanReadable, webhook);

}
