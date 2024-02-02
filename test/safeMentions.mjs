import { debug, info, warn } from "@rsc-utils/console-utils";
import { assert, runTests, startAsserting, stopAsserting } from "@rsc-utils/test-utils";
import { safeMentions } from "../build/index.js";

runTests(async function testSafeMentions() {
	const values = [
		["one @here", "one @\u200Bhere"],
		["two @everyone", "two @\u200Beveryone"],
	]
	values.forEach(([input, output]) => {
		assert(output, safeMentions, input)
	});
}, true);
