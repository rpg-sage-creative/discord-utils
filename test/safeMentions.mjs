import { assert, runTests } from "@rsc-utils/core-utils";
import { safeMentions } from "../build/index.js";

runTests(async function test_safeMentions() {
	const values = [
		["one @here", "one @\u200Bhere"],
		["two @everyone", "two @\u200Beveryone"],
	]
	values.forEach(([input, output]) => {
		assert(output, safeMentions, input)
	});
}, true);
