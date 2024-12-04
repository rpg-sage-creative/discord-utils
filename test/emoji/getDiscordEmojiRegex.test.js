import { getDiscordEmojiRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("emoji", () => {
	describe("getDiscordEmojiRegex", () => {

		const tests = [
			{ options:{}, input:"one 💯 hundred", testResult:false, execResults:null, matchResults:null },
			{ options:{}, input:"sage <:sage_heart_eyes:1159195747745538140> eyes", testResult:true, execResults:["<:sage_heart_eyes:1159195747745538140>"], matchResults:["<:sage_heart_eyes:1159195747745538140>"] },
			{ options:{}, input:"sage <a:sage_heart_eyes:1159195747745538140> eyes", testResult:true, execResults:["<a:sage_heart_eyes:1159195747745538140>"], matchResults:["<a:sage_heart_eyes:1159195747745538140>"] },
			// { options:{}, input:"INPUT", testResult:false, execResults:null, matchResults:null },
		];
		tests.forEach(({ options, input, testResult, execResults, matchResults }) => {
			test(`getDiscordEmojiRegex(${toString(options)}).test(${toString(input)})`, () => {
				expect(getDiscordEmojiRegex(options).test(input)).toBe(testResult);
			});
			test(`getDiscordEmojiRegex(${toString(options)}).exec(${toString(input)}) equals ${toString(execResults)}`, () => {
				expect(String(getDiscordEmojiRegex(options).exec(input))).toBe(String(execResults));
			});
			test(`${toString(input)}.match(getDiscordEmojiRegex(${toString({...options,gFlag:"g"})})) equals ${toString(matchResults)}`, () => {
				expect(String(input.match(getDiscordEmojiRegex({...options,gFlag:"g"})))).toBe(String(matchResults));
			});
		});

	});
});