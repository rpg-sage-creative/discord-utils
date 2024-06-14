import type { Message } from "discord.js";
import { toUserName } from "../toUserName.js";
import { channelToName } from "./channelToName.js";

/** @internal */
export function messageToChannelName(message: Message): string {
	const author = toUserName(message.author);
	if (message.guild) {
		return channelToName(message.channel) + author;
	}else {
		return author;
	}
}