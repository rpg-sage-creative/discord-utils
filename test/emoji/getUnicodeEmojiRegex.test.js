import { getUnicodeEmojiRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("emoji", () => {
	describe("getUnicodeEmojiRegex", () => {

		const tests = [
			{ options:{}, input:"one 💯 hundred", testResult:true, execResults:["💯"], matchResults:["💯"] },
			{ options:{}, input:"one 💯 hundred 💯", testResult:true, execResults:["💯"], matchResults:["💯", "💯"] },

			{ options:{}, input:"one 💯💯 hundred 💯", testResult:true, execResults:["💯"], matchResults:["💯", "💯", "💯"] },
			{ options:{quantifier:"+"}, input:"one 💯💯 hundred 💯", testResult:true, execResults:["💯💯"], matchResults:["💯💯", "💯"] },
			{ options:{quantifier:"{3,}"}, input:"one 💯💯 hundred 💯", testResult:false, execResults:null, matchResults:null },

			{ options:{capture:"emoji"}, input:"one 💯 hundred 💯", testResult:true, execResults:["💯", "💯"], matchResults:["💯", "💯"], captureGroup:"emoji", captureValue:"💯" },

			{ options:{}, input:"sage <:sage_heart_eyes:1159195747745538140> eyes", testResult:false, execResults:null, matchResults:null },
			{ options:{}, input:"sage <a:sage_heart_eyes:1159195747745538140> eyes", testResult:false, execResults:null, matchResults:null },
			// { options:{}, input:"INPUT", testResult:false, execResults:null, matchResults:null },
		];

		tests.forEach(({ options, input, testResult, execResults, matchResults, captureGroup, captureValue }) => {
			test(`getUnicodeEmojiRegex(${toString(options)}).test(${toString(input)})`, () => {
				expect(getUnicodeEmojiRegex(options).test(input)).toBe(testResult);
			});
			test(`getUnicodeEmojiRegex(${toString(options)}).exec(${toString(input)}) equals ${toString(execResults)}`, () => {
				const results = getUnicodeEmojiRegex(options).exec(input);
				if (execResults === null) {
					expect(results).toBeNull();
				}else {
					expect(String(results)).toBe(String(execResults));
				}
			});
			if (captureGroup || captureValue) {
				test(`getUnicodeEmojiRegex(${toString(options)}).exec(${toString(input)}).${captureGroup} === ${toString(captureValue)}`, () => {
					const results = getUnicodeEmojiRegex(options).exec(input);
					expect(results?.groups?.[captureGroup]).toBe(captureValue);
				});
			}
			test(`${toString(input)}.match(getUnicodeEmojiRegex(${toString({...options,gFlag:"g"})})) equals ${toString(matchResults)}`, () => {
				if (matchResults === null) {
					expect(input.match(getUnicodeEmojiRegex({...options,gFlag:"g"}))).toBeNull();
				}else {
					expect(String(input.match(getUnicodeEmojiRegex({...options,gFlag:"g"})))).toBe(String(matchResults));
				}
			});
		});

	});
});