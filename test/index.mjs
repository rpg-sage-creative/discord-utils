import { assert, debug, error, info, runTests, warn } from "@rsc-utils/console-utils";

runTests(async function testFunction() {
	assert(false, "No Tests!");
	info();
	debug();
	warn();
	error();
}, true);
