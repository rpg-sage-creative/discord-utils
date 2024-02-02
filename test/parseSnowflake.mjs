import { debug, info, warn } from "@rsc-utils/console-utils";
import { assert, runTests, startAsserting, stopAsserting } from "@rsc-utils/test-utils";
import { parseSnowflake } from "../build/index.js";

runTests(async function testParseSnowflake() {
	const id = "1234567890123456";
	const channelId = `<#${id}>`;
	const roleId = `<@&${id}>`;
	const userId = `<@${id}>`;
	const control = "control";
	assert(id, parseSnowflake, id);
	assert(id, parseSnowflake, channelId);
	assert(id, parseSnowflake, roleId);
	assert(id, parseSnowflake, userId);
	assert(null, parseSnowflake, control);
}, true);
