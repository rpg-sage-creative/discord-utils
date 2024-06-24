// import { assert, debug, verbose } from "@rsc-utils/core-utils";
// import { DiscordCache, toHumanReadable } from "../../../build/index.js";
// import { IDS } from "../DiscordCache.mjs";

// /**
//  * @param {DiscordCache} discordCache
//  * @param {IDS} ids
//  */
// export async function test_fetchDmChannel(discordCache, { DM_CHANNEL_ID, SUPER_USER_ID }) {

// 	const superUser = await discordCache.fetchUser(SUPER_USER_ID);
// 	assert("@​Randal", toHumanReadable, superUser);

// 	const superUserChannel = await discordCache.fetchChannel(DM_CHANNEL_ID);
// 	assert("@​Randal", toHumanReadable, superUserChannel);

// 	let dmChannel = superUser.dmChannel
// 	if (!dmChannel) {
// 		verbose(`Creating DM: ${superUser.username}`);
// 		dmChannel = await superUser.createDM(true);
// 	}
// 	assert("@​Randal", toHumanReadable, dmChannel);

// 	const message = await dmChannel.send("Testing DM");
// 	assert("Testing DM", msg => msg, message?.content);
// }
