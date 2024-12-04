import { toChannelMention } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("mention", () => {
	describe("toChannelMention", () => {
		const tests = [
			{ input:"1234567890123456", expected:`<#1234567890123456>` },
		];
		tests.forEach(({ input, expected }) => {
			test(`toChannelMention(${toString(input)}) === ${toString(expected)}`, () => {
				expect(toChannelMention(input)).toBe(expected);
			});
		});

	});
});