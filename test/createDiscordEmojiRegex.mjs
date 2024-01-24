import { assert, runTests } from "@rsc-utils/console-utils";
import { createDiscordEmojiRegex } from "../build/index.js";

runTests(async function testCreateDiscordEmojiRegex() {
	const regex = createDiscordEmojiRegex();
	const test = value => regex.exec(value)?.[0];
	const values = [
		["one 💯 hundred", "💯"],
		["sage <:sage_heart_eyes:1159195747745538140> eyes", "<:sage_heart_eyes:1159195747745538140>"],
	];
	values.forEach(([input, output]) => {
		assert(output, test, input);
	});
}, true);
