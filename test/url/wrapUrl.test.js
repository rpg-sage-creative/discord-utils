import { toLiteral } from "@rsc-utils/core-utils";
import { wrapUrl } from "../../build/index.js";

describe("url", () => {
	describe("wrapUrl", () => {

		const unwrappedUrl = "https://google.com";
		const wrappedUrl = "<https://google.com>";
		const nonUrl = "hello there";
		const multipleUrlsBefore = [nonUrl, wrappedUrl, nonUrl, unwrappedUrl, nonUrl, unwrappedUrl].join(" ");
		const multipleUrlsAfter = [nonUrl, wrappedUrl, nonUrl, wrappedUrl, nonUrl, wrappedUrl].join(" ");

		const tests = [
			{ input:unwrappedUrl, all:undefined, expected:wrappedUrl },
			{ input:unwrappedUrl+" ", all:undefined, expected:unwrappedUrl+" " },
			{ input:unwrappedUrl+" ", all:true, expected:wrappedUrl+" " },
			{ input:unwrappedUrl, all:true, expected:wrappedUrl },
			{ input:wrappedUrl, all:undefined, expected:wrappedUrl },
			{ input:nonUrl, all:undefined, expected:nonUrl },
			{ input:multipleUrlsBefore, all:true, expected:multipleUrlsAfter },
		];
		tests.forEach(({ input, all, expected }) => {
			test(`wrapUrl(${toLiteral(input)}, ${toLiteral(all)}) === ${toLiteral(expected)}`, () => {
				expect(wrapUrl(input, all)).toBe(expected);
			});
		});

	});
});