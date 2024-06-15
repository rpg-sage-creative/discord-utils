import { type Optional } from "@rsc-utils/core-utils";
import { type Channel, type MessageReference } from "discord.js";
import { isGuildBased, type MessageOrPartial } from "../types/types.js";

function createUrl(guildId: Optional<string>, channelId: string): string {
	return `https://discord.com/channels/${guildId ?? "@me"}/${channelId}`;
}

export function toChannelUrl(ref: Channel | MessageOrPartial | MessageReference): string {
	if ("channelId" in ref) {
		return createUrl(ref.guildId, ref.channelId);
	}
	if (isGuildBased(ref)) {
		return createUrl(ref.guildId, ref.id);
	}
	return createUrl(undefined, ref.id);
}