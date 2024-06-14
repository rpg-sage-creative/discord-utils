import { assert } from "@rsc-utils/core-utils";
import { runDiscordTests, toHumanReadable } from "../build/index.js";

const CHANNEL_ID = "1187120335343058984";
const GUILD_ID = "963531189254238278";
const SUPER_USER_ID = "253330271678627841";
const ROLE_ID = "984178537613381732";
const WEBHOOK_ID = "1187126825042858149";

runDiscordTests(async function test_toHumanReadable(client) {
	const channel = await client.channels.fetch(CHANNEL_ID);
	assert("RPG Sage (Dev)#​pf2e-ic", toHumanReadable, channel);

	const guild = await client.guilds.fetch(GUILD_ID);
	assert("RPG Sage (Dev)", toHumanReadable, guild);

	const user = await client.users.fetch(SUPER_USER_ID);
	assert("@​Randal", toHumanReadable, user);

	const guildMember = await guild.members.fetch(SUPER_USER_ID);
	assert("@​Randal", toHumanReadable, guildMember);

	const role = await guild.roles.fetch(ROLE_ID);
	assert("RPG Sage (Dev)#​Developer", toHumanReadable, role);

	const webhook = (await guild.fetchWebhooks()).get(WEBHOOK_ID);
	assert("@​RPG Sage (Dev)$SageDialogWebhookName", toHumanReadable, webhook);

}, true);
