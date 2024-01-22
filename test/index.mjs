import { enableLogLevels, info, debug, warn } from "@rsc-utils/console-utils";

async function main() {
	warn(`CREATE SOME TESTS!`);
}
enableLogLevels("development");
main();