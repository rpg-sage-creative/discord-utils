import { assert } from "@rsc-utils/core-utils";
import { DiscordCache, toChannelUrl } from "../../../build/index.js";
import { IDS } from "../DiscordCache.mjs";

/**
 * @param {DiscordCache} discordCache
 * @param {IDS} ids
 */
export async function test_toChannelUrl(discordCache, { CHANNEL_ID, GUILD_ID, MESSAGE_ID }) {

	/** @type {import("discord.js").GuildTextBasedChannel} */
	const channel = await discordCache.fetchChannel({ channelId:CHANNEL_ID, guildId:GUILD_ID });
	const CHANNEL_LINK = `https://discord.com/channels/${GUILD_ID}/${CHANNEL_ID}`;
	assert(channel?.url, toChannelUrl, channel);
	assert(CHANNEL_LINK, toChannelUrl, channel);

	const message = await channel?.messages.fetch({ message:MESSAGE_ID, cache:true, force:true });
	assert(message?.channel?.url, toChannelUrl, message);
	assert(CHANNEL_LINK, toChannelUrl, message);

}
