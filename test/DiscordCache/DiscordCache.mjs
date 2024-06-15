import { assert } from "@rsc-utils/core-utils";
import { runDiscordTests, DiscordCache, toHumanReadable } from "../../build/index.js";

const CHANNEL_ID = "1187120335343058984";
const GUILD_ID = "963531189254238278";
const STABLE_GUILD_ID = "480488957889609733";
// const SUPER_USER_ID = "253330271678627841";
// const ROLE_ID = "984178537613381732";
// const WEBHOOK_ID = "1187126825042858149";

runDiscordTests(async function test_DiscordCache(client) {
	const dc = await DiscordCache.from(client, GUILD_ID);

	const guild = await dc.fetchGuild(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guild);

	const guildName = await dc.fetchGuildName(STABLE_GUILD_ID);
	assert("RPG Sage", s => s, guildName);

	const channel = await dc.fetchChannel({ channelId:CHANNEL_ID, guildId:GUILD_ID });
	assert("RPG Sage (Dev)#​pf2e-ic", toHumanReadable, channel);


	// const user = await client.users.fetch(SUPER_USER_ID);
	// assert("@​Randal", toHumanReadable, user);

	// const guildMember = await guild.members.fetch(SUPER_USER_ID);
	// assert("@​Randal", toHumanReadable, guildMember);

	// const role = await guild.roles.fetch(ROLE_ID);
	// assert("RPG Sage (Dev)#​Developer", toHumanReadable, role);

	// const webhook = (await guild.fetchWebhooks()).get(WEBHOOK_ID);
	// assert("@​RPG Sage (Dev)$SageDialogWebhookName", toHumanReadable, webhook);

}, true);
