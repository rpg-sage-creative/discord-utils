import { toRoleMention } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("mention", () => {
	describe("toRoleMention", () => {
		const tests = [
			{ input:"1234567890123456", expected:`<@&1234567890123456>` },
		];
		tests.forEach(({ input, expected }) => {
			test(`toRoleMention(${toString(input)}) === ${toString(expected)}`, () => {
				expect(toRoleMention(input)).toBe(expected);
			});
		});

	});
});