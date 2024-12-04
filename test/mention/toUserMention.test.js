import { toUserMention } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("mention", () => {
	describe("toUserMention", () => {
		const tests = [
			{ input:"1234567890123456", expected:`<@1234567890123456>` },
		];
		tests.forEach(({ input, expected }) => {
			test(`toUserMention(${toString(input)}) === ${toString(expected)}`, () => {
				expect(toUserMention(input)).toBe(expected);
			});
		});

	});
});