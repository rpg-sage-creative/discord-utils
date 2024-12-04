import { safeMentions } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("mention", () => {
	describe("safeMentions", () => {
		const tests = [
			{ input:"one @here", expected:"one @\u200Bhere" },
			{ input:"two @everyone", expected:"two @\u200Beveryone" },
		];
		tests.forEach(({ input, expected }) => {
			test(`safeMentions(${toString(input)}) === ${toString(expected)}`, () => {
				expect(safeMentions(input)).toBe(expected);
			});
		});

	});
});