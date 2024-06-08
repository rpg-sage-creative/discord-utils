import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { type MessageReference } from "discord.js";
import { type MessageOrPartial } from "../types.js";

function createUrl(guildId: Optional<Snowflake>, channelId: Snowflake, messageId: Snowflake): string {
	return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}/${messageId}`;
}

export function toMessageUrl(ref: MessageOrPartial | MessageReference): string | null {
	if ("messageId" in ref) {
		if (ref.messageId) {
			return createUrl(ref.guildId, ref.channelId, ref.messageId);
		}
	}else if (ref.id) {
		return createUrl(ref.guildId, ref.channelId, ref.id);
	}
	return null;
}
