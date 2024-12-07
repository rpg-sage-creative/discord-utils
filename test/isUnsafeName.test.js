import { toLiteral } from "@rsc-utils/core-utils";
import { isUnsafeName } from "../build/index.js";

describe("isUnsafeName", () => {

	describe("control values", () => {

		const tests = [
			{ input:"Accord", expected:false },
			{ input:"Dismantle", expected:false },

			{ input:undefined, expected:false },
			{ input:null, expected:false },
			{ input:"", expected:false },
		];
		tests.forEach(({ input, expected }) => {
			test(`isUnsafeName(${toString(input)}) === ${toString(expected)}`, () => {
				expect(isUnsafeName(input)).toBe(expected);
			});
		});

	});

	describe(`"discord"`, () => {

		const discord = "discord";

		const letters = [
			"d",
			"il1",
			"s5",
			"c",
			"o0",
			"r",
			"d"
		];

		const variants = new Set([discord]);

		letters.forEach((chars, letterIndex) => {
			chars.split("").forEach(char => {
				[...variants].forEach(variant => {
					const word = variant.split("");
					word[letterIndex] = char;
					variants.add(word.join(""));
				});
			});
		});

		variants.forEach(variant => {
			test(`isUnsafe(${toLiteral(variant)}) === ${toLiteral(discord)}`, () => {
				expect(isUnsafeName(variant)).toBe(discord);
			});
		});

	});

});