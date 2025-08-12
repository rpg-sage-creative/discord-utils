import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import { getPermsFor } from "./getPermsFor.js";
import { isLockedOrArchivedThread } from "./internal/isLockedOrArchivedThread.js";

export function canWebhookTo(botId: Snowflake, channel: Optional<Channel>): boolean {
	if (!channel?.isSendable()) {
		return false;
	}

	if (isLockedOrArchivedThread(channel)) {
		return false;
	}

	const perms = getPermsFor(channel, botId);
	return perms.canSendWebhooks;
}
