import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import type { ThreadGameChannel } from "./isThreadGameChannel.js";

/** Channels Sage can send messages to. */
export type TextGameChannel = TextChannel | ThreadGameChannel;

export function isTextGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is TextGameChannel {
	if (channel && "isThread" in channel) {
		return channel.type === 0 //ChannelType.GuildText
			|| channel.type === 11 //ChannelType.PublicThread
			|| channel.type === 12 //ChannelType.PrivateThread
			;
	}
	return false;
}