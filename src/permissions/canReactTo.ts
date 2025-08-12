import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { Channel, DMChannel } from "discord.js";
import { getPermsFor } from "./getPermsFor.js";
import { isLockedOrArchivedThread } from "./internal/isLockedOrArchivedThread.js";
import type { TextGameChannel } from "../types/index.js";

export function canReactTo(botId: Snowflake, channel: Optional<Channel>): channel is TextGameChannel | DMChannel {
	if (!channel) {
		return false;
	}

	if (channel.isDMBased()) {
		return true;
	}

	if (isLockedOrArchivedThread(channel)) {
		return false;
	}

	const perms = getPermsFor(channel, botId);
	return perms.canAddReactions;
}