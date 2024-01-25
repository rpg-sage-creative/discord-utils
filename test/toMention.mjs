import { assert, runTests } from "@rsc-utils/console-utils";
import { toChannelMention, toRoleMention, toUserMention } from "../build/index.js";

runTests(async function testToMention() {
	const id = "1234567890123456";
	assert(`<#${id}>`, toChannelMention, id);
	assert(`<@&${id}>`, toRoleMention, id);
	assert(`<@${id}>`, toUserMention, id);
}, true);
