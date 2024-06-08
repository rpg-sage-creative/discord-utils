import { assert, runTests } from "@rsc-utils/core-utils";
import { createEmojiRegex } from "../build/index.js";

runTests(async function test_createEmojiRegex() {
	const regex = createEmojiRegex();
	const test = value => regex.exec(value)?.[0];
	const values = [
		["one 💯 hundred", "💯"],
		["sage <:sage_heart_eyes:1159195747745538140> eyes", "<:sage_heart_eyes:1159195747745538140>"],
		["sage <a:sage_heart_eyes:1159195747745538140> eyes", "<a:sage_heart_eyes:1159195747745538140>"],
	];
	values.forEach(([input, output]) => {
		assert(output, test, input);
	});
}, true);
