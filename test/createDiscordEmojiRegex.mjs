import { assert, runTests } from "@rsc-utils/console-utils";
import { createEmojiRegex } from "../build/index.js";

runTests(async function testCreateEmojiRegex() {
	const regex = createEmojiRegex();
	const test = value => regex.exec(value)?.[0];
	const values = [
		["one 💯 hundred", "💯"],
		["sage <:sage_heart_eyes:1159195747745538140> eyes", "<:sage_heart_eyes:1159195747745538140>"],
	];
	values.forEach(([input, output]) => {
		assert(output, test, input);
	});
}, true);
