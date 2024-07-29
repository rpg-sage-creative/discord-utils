import { assert } from "@rsc-utils/core-utils";
import { DiscordCache, toMessageUrl } from "../../../build/index.js";
import { IDS } from "../DiscordCache.mjs";

/**
 * @param {DiscordCache} discordCache
 * @param {IDS} ids
 */
export async function test_toMessageUrl(discordCache, { CHANNEL_ID, GUILD_ID, MESSAGE_ID }) {

	/** @type {import("discord.js").GuildTextBasedChannel} */
	const channel = await discordCache.fetchChannel({guildId:GUILD_ID,channelId:CHANNEL_ID});
	const message = await channel.messages.fetch(MESSAGE_ID);
	const MESSAGE_LINK = `https://discord.com/channels/${GUILD_ID}/${CHANNEL_ID}/${MESSAGE_ID}`;
	assert(message?.url, toMessageUrl, message);
	assert(MESSAGE_LINK, toMessageUrl, message);

}
