import type { Optional } from "@rsc-utils/core-utils";
import { ChannelType, type CategoryChannel, type Channel, type ForumChannel, type TextChannel } from "discord.js";

export type SupportedParentChannel = CategoryChannel | ForumChannel | TextChannel;

export function isSupportedParentChannel(channel: Optional<Channel>): channel is SupportedParentChannel {
	if (!channel) return false;
	switch(channel.type) {
		// supported
		case ChannelType.GuildCategory: return true;
		case ChannelType.GuildForum: return true;
		case ChannelType.GuildText: return true;

		// not supported
		// case ChannelType.GuildAnnouncement: return false;
		// case ChannelType.GuildMedia: return false;

		default: return false;
	}
}