import type { Optional } from "@rsc-utils/core-utils";
import { ChannelType, type Channel, type ForumChannel, type TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";

export type SupportedWebhookChannel = ForumChannel | TextChannel;

export function isSupportedWebhookChannel(channel: Optional<Channel | UserOrPartial>): channel is SupportedWebhookChannel {
	if (!channel || !("type" in channel)) return false;
	switch(channel.type) {
		// supported
		// case ChannelType.DM: return true;
		case ChannelType.GuildForum: return true;
		case ChannelType.GuildText: return true;
		// case ChannelType.PrivateThread: return isSupportedParentChannel(channel.parent);
		// case ChannelType.PublicThread: return isSupportedParentChannel(channel.parent);

		// not supported
		// case ChannelType.AnnouncementThread: return false;
		// case ChannelType.GuildAnnouncement: return false;
		// case ChannelType.GuildCategory: return false;
		// case ChannelType.GuildDirectory: return false;
		// case ChannelType.GuildMedia: return false;
		// case ChannelType.GuildStageVoice: return false;
		// case ChannelType.GuildVoice: return false;
		// case ChannelType.GroupDM: return false;

		default: return false;
	}
}
