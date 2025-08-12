import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, DMChannel, PartialUser, User } from "discord.js";
import type { TextGameChannel } from "./isTextGameChannel.js";

export type MessageTarget = DMChannel | TextGameChannel | User;

export function isMessageTarget(value: Optional<Channel | User | PartialUser>): value is MessageTarget {
	if (value?.partial === false) {
		if ("isThread" in value) {
			return value.type === 0 //ChannelType.GuildText
				|| value.type === 1 //ChannelType.DM
				|| value.type === 11 //ChannelType.PublicThread
				|| value.type === 12 //ChannelType.PrivateThread
				;
		}
		return true;
	}
	return false;
}