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

	describe(`"everyone"`, () => {

		const unsafeData = { type:"anchored", value:"everyone" };

		const tests = [
			"everyone",
			"EVERYONE",
			"3veryone",
			"every0ne",
		];

		tests.forEach(input => {
			test(`isUnsafe(${toLiteral(input)}) === ${toLiteral(unsafeData)}`, () => {
				expect(isUnsafeName(input)).toStrictEqual(unsafeData);
			});
		});

	});

	describe(`"here"`, () => {

		const unsafeData = { type:"anchored", value:"here" };

		const tests = [
			"here",
			"HERE",
			"h3r3",
		];

		tests.forEach(input => {
			test(`isUnsafe(${toLiteral(input)}) === ${toLiteral(unsafeData)}`, () => {
				expect(isUnsafeName(input)).toStrictEqual(unsafeData);
			});
		});

	});

	describe(`"discord"`, () => {

		const unsafeData = { type:"partial", value:"discord" };

		const letters = [
			"d",
			"il1",
			"s5",
			"c",
			"o0",
			"r",
			"d"
		];

		const variants = new Set(["discord"]);

		letters.forEach((chars, letterIndex) => {
			chars.split("").forEach(char => {
				[...variants].forEach(variant => {
					const word = variant.split("");
					word[letterIndex] = char;
					variants.add(word.join(""));
					variants.add(word.join("").toUpperCase());
				});
			});
		});

		variants.forEach(variant => {
			test(`isUnsafe(${toLiteral(variant)}) === ${toLiteral(unsafeData)}`, () => {
				expect(isUnsafeName(variant)).toStrictEqual(unsafeData);
			});
		});

	});


	describe(`"clyde"`, () => {

		const unsafeData = { type:"partial", value:"clyde" };

		const letters = [
			"c",
			"l",
			"y",
			"d",
			"e3",
		];

		const variants = new Set(["clyde"]);

		letters.forEach((chars, letterIndex) => {
			chars.split("").forEach(char => {
				[...variants].forEach(variant => {
					const word = variant.split("");
					word[letterIndex] = char;
					variants.add(word.join(""));
					variants.add(word.join("").toUpperCase());
				});
			});
		});

		variants.forEach(variant => {
			test(`isUnsafe(${toLiteral(variant)}) === ${toLiteral(unsafeData)}`, () => {
				expect(isUnsafeName(variant)).toStrictEqual(unsafeData);
			});
		});

	});

	describe('"```"', () => {
		const unsafeData = { type:"chars", value:"```" };
		const tests = ["a ```code block```"];
		tests.forEach(input => {
			test(`isUnsafeName(${toLiteral(input)}) === ${toLiteral(unsafeData)}`, () => {
				expect(isUnsafeName(input)).toStrictEqual(unsafeData);
			});
		});
	});

});