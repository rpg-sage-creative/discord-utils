import type { Channel } from "discord.js";
import { isThreadGameChannel, type ThreadGameChannel } from "../../types/typeGuards/isThreadGameChannel.js";

export function isLockedOrArchivedThread(channel: Channel): channel is ThreadGameChannel {
	if (isThreadGameChannel(channel)) {
		if (channel.locked) {
			return true;
		}
		if (channel.archived && !channel.unarchivable) {
			return true;
		}
	}
	return false;
}