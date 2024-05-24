import { assert, runTests } from "@rsc-utils/core-utils";
import { wrapUrl } from "../../build/index.js";

runTests(async function test_wrapUrl() {
	const unwrappedUrl = "https://google.com";
	const wrappedUrl = "<https://google.com>";
	const nonUrl = "hello there";
	const multipleUrlsBefore = [nonUrl, wrappedUrl, nonUrl, unwrappedUrl, nonUrl, unwrappedUrl].join(" ");
	const multipleUrlsAfter = [nonUrl, wrappedUrl, nonUrl, wrappedUrl, nonUrl, wrappedUrl].join(" ");
	assert(wrappedUrl, wrapUrl, unwrappedUrl);
	assert(unwrappedUrl+" ", wrapUrl, unwrappedUrl+" ");
	assert(wrappedUrl+" ", wrapUrl, unwrappedUrl+" ", true);
	assert(wrappedUrl, wrapUrl, unwrappedUrl, true);
	assert(wrappedUrl, wrapUrl, wrappedUrl);
	assert(nonUrl, wrapUrl, nonUrl);
	assert(multipleUrlsAfter, wrapUrl, multipleUrlsBefore, true);
}, true);