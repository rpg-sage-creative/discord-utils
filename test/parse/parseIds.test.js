import { parseIds, toChannelMention, toRoleMention, toUserMention } from "../../build/index.js";

describe("parse", () => {
	describe("parseIds", () => {

		const channelIds = ["1234567890222222", "1234567890222233", "1234567890222244"];
		const channelMentions = channelIds.map(toChannelMention);

		const roleIds = ["1234567890333333", "1234567890333344", "1234567890333355"];
		const roleMentions = roleIds.map(toRoleMention);

		const userIds = ["1234567890111111", "1234567890111122", "1234567890111133"];
		const userMentions = userIds.map(toUserMention);

		const rawSnowflakes = [" 1234567890444444 ", " 1234567890444455 ", " 1234567890444466 "];

		const invalid = ["a1234567890555555a", "a1234567890555566a", "a1234567890555577a"];

		let content = "";
		for (let i = 0; i < invalid.length; i++) {
			content += ` ${channelMentions[i]} \n ${userMentions[i]} ${roleMentions[i]} \n ${rawSnowflakes[i]} ${invalid[i]} `;
		}

		test(`parseIds(content, "channel")`, () => {
			const results = parseIds(content, "channel");
			expect(results.length).toBe(channelIds.length);
			results.every(id => expect(channelIds.includes(id)).toBe(true));
		});

		test(`parseIds(content, "role")`, () => {
			const results = parseIds(content, "role");
			expect(results.length).toBe(roleIds.length);
			results.every(id => expect(roleIds.includes(id)).toBe(true));
		});

		test(`parseIds(content, "user")`, () => {
			const results = parseIds(content, "user");
			expect(results.length).toBe(userIds.length);
			results.every(id => expect(userIds.includes(id)).toBe(true));
		});

		test(`parseIds(content, "user", true)`, () => {
			const results = parseIds(content, "user", true);
			expect(results.length).toBe(channelIds.length + roleIds.length + userIds.length + rawSnowflakes.length);
			results.every(id => expect(channelIds.includes(id) || roleIds.includes(id) || userIds.includes(id) || rawSnowflakes.includes(id)).toBe(true));
		});

	});
});