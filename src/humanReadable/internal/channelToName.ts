
import { ZERO_WIDTH_SPACE, type Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import { isDMBased, isGroupDMBased } from "../../types/types.js";
import { toGuildName } from "../toGuildName.js";
import { toUserName } from "../toUserName.js";

/** @internal */
export function channelToName(channel: Optional<Channel>): string | undefined {
	if (channel) {
		if (isDMBased(channel)) {
			if (isGroupDMBased(channel)) {
				return channel.recipients.map(toUserName).join(",");
			}
			return toUserName(channel.recipient);
		}
		const guildName = toGuildName(channel.guild);
		const channelName = channel.name ?? channel.id;
		return `${guildName}#${ZERO_WIDTH_SPACE}${channelName}`;
	}
	return undefined;
}