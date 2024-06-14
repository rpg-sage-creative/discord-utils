import { assert } from "@rsc-utils/core-utils";
import { toChannelUrl, runDiscordTests } from "../../build/index.js";

const CHANNEL_LINK = "https://discord.com/channels/963531189254238278/1187120335343058984";
const CHANNEL_ID = "1187120335343058984";
const MESSAGE_ID = "1243324822067351562";

runDiscordTests(async function test_toChannelUrl(client) {

	/** @type {import("discord.js").GuildTextBasedChannel} */
	const channel = await client.channels.fetch(CHANNEL_ID);
	assert(channel?.url, toChannelUrl, channel);
	assert(CHANNEL_LINK, toChannelUrl, channel);

	const message = await channel.messages.fetch(MESSAGE_ID);
	assert(message?.channel?.url, toChannelUrl, message);
	assert(CHANNEL_LINK, toChannelUrl, message);

}, true);
