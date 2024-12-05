import { isUnsafeName } from "../build/index.js";
import { toString } from "./toString.mjs";

describe("isUnsafeName", () => {

	const tests = [

		{ input:"discord", expected:"discord" },
		{ input:"dlscord", expected:"discord" },
		{ input:"d1scord", expected:"discord" },
		{ input:"disc0rd", expected:"discord" },
		{ input:"d1sc0rd", expected:"discord" },
		{ input:"d15c0rd", expected:"discord" },
		{ input:"dl5c0rd", expected:"discord" },

		{ input:"DiScOrD", expected:"discord" },
		{ input:"D1ScorD", expected:"discord" },
		{ input:"DiSc0rD", expected:"discord" },
		{ input:"D1Sc0rD", expected:"discord" },
		{ input:"D15c0rD", expected:"discord" },
		{ input:"Dl5c0rD", expected:"discord" },

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