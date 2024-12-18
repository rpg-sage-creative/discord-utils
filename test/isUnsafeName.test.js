import { toLiteral } from "@rsc-utils/core-utils";
import { isUnsafeName } from "../build/index.js";

/** returns all the letters that might be used to create a variant of a username */
function getLetterVariants(letter) {
	switch(letter) {
		case "e": return "e3";
		case "i": return "il1";
		case "o": return "o0";
		case "s": return "s5";
		default: return letter;
	}
}

/** uses getLetterVariants to create every unique variant of a username */
function createVariants(value) {
	if (!value) return [];

	const variants = new Set([value]);

	const letters = value.split("").map(getLetterVariants);

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

	return variants;
}

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
			test(`isUnsafeName(${toLiteral(input)}) === ${toLiteral(expected)}`, () => {
				expect(isUnsafeName(input)).toBe(expected);
			});
		});

	});

	const values = ["everyone", "here", "discord", "clyde", "wumpus", "```"];

	values.forEach(value => {

		describe(`"${value}"`, () => {
			const variants = createVariants(value);
			variants.forEach(variant => {
				test(`isUnsafe(${toLiteral(variant)}) === ${toLiteral(value)}`, () => {
					expect(isUnsafeName(variant)).toBe(value);
				});
			});
		});

	});

});