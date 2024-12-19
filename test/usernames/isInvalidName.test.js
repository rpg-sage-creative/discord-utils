import { toLiteral } from "@rsc-utils/core-utils";
import { isInvalidName } from "../../build/index.js";

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

describe("isInvalidName", () => {

	describe("control values", () => {

		const tests = [
			{ input:"Accord", expected:false },
			{ input:"Dismantle", expected:false },

			{ input:undefined, expected:false },
			{ input:null, expected:false },
			{ input:"", expected:false },
		];
		tests.forEach(({ input, expected }) => {
			test(`isInvalidName(${toLiteral(input)}) === ${toLiteral(expected)}`, () => {
				expect(isInvalidName(input)).toBe(expected);
			});
		});

	});

	const tests = [
		{ name:"everyone", anchored:true, variants:true },
		{ name:"here",     anchored:true, variants:true },

		{ name:"discord",  variants:true },
		{ name:"clyde"     },
		{ name:"wumpus",   },

		{ name:"```" },
	];

	tests.forEach(({ name, anchored, variants }) => {

		describe(`"${name}"`, () => {

			const inputs = variants ? createVariants(name) : [name];

			inputs.forEach(input => {
				test(`isInvalidName(${toLiteral(input)}) === ${toLiteral(name)}`, () => {
					expect(isInvalidName(input)).toBe(name);
				});
			});

			const unanchored = `${name} unanchored`;
			test(`isInvalidName(${toLiteral(unanchored)}) === ${toLiteral(anchored ? false : name)}`, () => {
				expect(isInvalidName(unanchored)).toBe(anchored ? false : name);
			});

		});

	});

});