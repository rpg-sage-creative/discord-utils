import { assert, runTests } from "@rsc-utils/core-utils";
import { parseId } from "../../build/index.js";

runTests(async function test_parseId() {
	const id = "1234567890123456";
	const channelId = `<#${id}>`;
	const roleId = `<@&${id}>`;
	const userId = `<@${id}>`;
	const userId2 = `<@!${id}>`;
	const control = "control";
	assert(id, parseId, channelId, "channel");
	assert(undefined, parseId, roleId, "channel");
	assert(undefined, parseId, userId, "channel");
	assert(undefined, parseId, userId2, "channel");
	assert(undefined, parseId, control, "channel");

	assert(undefined, parseId, channelId, "role");
	assert(id, parseId, roleId, "role");
	assert(undefined, parseId, userId, "role");
	assert(undefined, parseId, userId2, "role");
	assert(undefined, parseId, control, "role");

	assert(undefined, parseId, channelId, "user");
	assert(undefined, parseId, roleId, "user");
	assert(id, parseId, userId, "user");
	assert(id, parseId, userId2, "user");
	assert(undefined, parseId, control, "user");

	const channelUrl = "https://discord.com/channels/480488957889609733/1182487240534937610";
	assert("1182487240534937610", parseId, channelUrl, "channel");
	assert(undefined, parseId, channelUrl, "message");

	const messageUrl = "https://discord.com/channels/480488957889609733/1182487240534937610/1192628934014140476";
	assert(undefined, parseId, messageUrl, "channel");
	assert("1192628934014140476", parseId, messageUrl, "message");

}, true);
