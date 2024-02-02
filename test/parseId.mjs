import { debug, info, warn } from "@rsc-utils/console-utils";
import { assert, runTests, startAsserting, stopAsserting } from "@rsc-utils/test-utils";
import { parseId } from "../build/index.js";

runTests(async function testParseId() {
	const id = "1234567890123456";
	const channelId = `<#${id}>`;
	const roleId = `<@&${id}>`;
	const userId = `<@${id}>`;
	const userId2 = `<@!${id}>`;
	const control = "control";
	assert(id, parseId, channelId, "channel");
	assert(null, parseId, roleId, "channel");
	assert(null, parseId, userId, "channel");
	assert(null, parseId, userId2, "channel");
	assert(null, parseId, control, "channel");

	assert(null, parseId, channelId, "role");
	assert(id, parseId, roleId, "role");
	assert(null, parseId, userId, "role");
	assert(null, parseId, userId2, "role");
	assert(null, parseId, control, "role");

	assert(null, parseId, channelId, "user");
	assert(null, parseId, roleId, "user");
	assert(id, parseId, userId, "user");
	assert(id, parseId, userId2, "user");
	assert(null, parseId, control, "user");

	const channelUrl = "https://discord.com/channels/480488957889609733/1182487240534937610";
	assert("1182487240534937610", parseId, channelUrl, "channel");
	assert(null, parseId, channelUrl, "message");

	const messageUrl = "https://discord.com/channels/480488957889609733/1182487240534937610/1192628934014140476";
	assert(null, parseId, messageUrl, "channel");
	assert("1192628934014140476", parseId, messageUrl, "message");

}, true);
