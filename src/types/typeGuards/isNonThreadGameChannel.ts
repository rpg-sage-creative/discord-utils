import type { Optional } from "@rsc-utils/core-utils";
import type { CategoryChannel, Channel, ForumChannel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";

/** Channels Sage can check permissions in. */
export type NonThreadGameChannel = TextChannel | ForumChannel | CategoryChannel;

export function isNonThreadGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is NonThreadGameChannel {
	if (channel && "isThread" in channel) {
		return channel.type === 0 //ChannelType.GuildText
			|| channel.type === 4 //ChannelType.GuildCategory
			|| channel.type === 15 //ChannelType.GuildForum
			;
	}
	return false;
}