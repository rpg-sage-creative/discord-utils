import { assert } from "@rsc-utils/core-utils";
import { DiscordCache, toUserUrl } from "../../../build/index.js";
import { IDS } from "../DiscordCache.mjs";

/**
 * @param {DiscordCache} discordCache
 * @param {IDS} ids
 */
export async function test_toUserUrl(discordCache, { SUPER_USER_ID }) {
	const user = await discordCache.fetchUser(SUPER_USER_ID);
	const SUPER_USER_LINK = `https://discordapp.com/users/${SUPER_USER_ID}`;
	assert(SUPER_USER_LINK, toUserUrl, user);
}
