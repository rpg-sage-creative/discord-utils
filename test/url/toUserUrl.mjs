import { assert } from "@rsc-utils/core-utils";
import { toUserUrl, runDiscordTests } from "../../build/index.js";

const SUPER_USER_ID = "253330271678627841";
const SUPER_USER_LINK = `https://discordapp.com/users/${SUPER_USER_ID}`;

runDiscordTests(async function test_toUserUrl(client) {

	const user = await client.users.fetch(SUPER_USER_ID);
	assert(SUPER_USER_LINK, toUserUrl, user);

}, true);
