import { assert } from "@rsc-utils/core-utils";
import { toMessageUrl, runDiscordTests } from "../../build/index.js";

const CHANNEL_ID = "1187120335343058984";
const MESSAGE_LINK = "https://discord.com/channels/963531189254238278/1187120335343058984/1243324822067351562";
const MESSAGE_ID = "1243324822067351562";

runDiscordTests(async function test_toMessageUrl(client) {

	/** @type {import("discord.js").GuildTextBasedChannel} */
	const channel = await client.channels.fetch(CHANNEL_ID);
	const message = await channel.messages.fetch(MESSAGE_ID);
	assert(message?.url, toMessageUrl, message);
	assert(MESSAGE_LINK, toMessageUrl, message);

}, true);
