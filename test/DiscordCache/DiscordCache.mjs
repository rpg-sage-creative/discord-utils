import { assert, startAsserting } from "@rsc-utils/core-utils";
import { DiscordCache, runDiscordTests } from "../../build/index.js";
import { test_toHumanReadable } from "./tests/toHumanReadable.mjs";
import { test_toUserUrl } from "./tests/toUserUrl.mjs";
import { test_toChannelUrl } from "./tests/toChannelUrl.mjs";
import { test_toMessageUrl } from "./tests/toMessageUrl.mjs";
import { test_fetchGuild } from "./tests/fetchGuild.mjs";
// import { test_fetchDmChannel } from "./tests/fetchDmChannel.mjs";

export const IDS = {
	CHANNEL_ID: "1187120335343058984",
	DM_CHANNEL_ID: "654449179493400649",
	GUILD_ID: "963531189254238278",
	MESSAGE_ID: "1243324822067351562",
	SAGE_ID: "653643416311169044",
	STABLE_GUILD_ID: "480488957889609733",
	SUPER_USER_ID: "253330271678627841",
	ROLE_ID: "984178537613381732",
	WEBHOOK_ID: "1187126825042858149",
};

runDiscordTests(async function test_DiscordCache(client) {
	DiscordCache.setSageId(IDS.SAGE_ID);
	const discordCache = await DiscordCache.from(client, IDS.GUILD_ID);

	// startAsserting("test_fetchDmChannel");
	// await test_fetchDmChannel(discordCache, IDS);

	startAsserting("test_fetchGuild");
	await test_fetchGuild(discordCache, IDS);

	startAsserting("test_toChannelUrl");
	await test_toChannelUrl(discordCache, IDS);

	startAsserting("test_toHumanReadable");
	await test_toHumanReadable(discordCache, IDS);

	startAsserting("test_toMessageUrl");
	await test_toMessageUrl(discordCache, IDS);

	startAsserting("test_toUserUrl");
	await test_toUserUrl(discordCache, IDS);

	const guildName = await discordCache.fetchGuildName(IDS.STABLE_GUILD_ID);
	assert("RPG Sage", s => s, guildName);

}, true);
