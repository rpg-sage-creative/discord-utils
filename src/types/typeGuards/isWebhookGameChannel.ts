import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, ForumChannel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";

/** Channels Sage can get webhooks from. */
export type WebhookGameChannel = TextChannel | ForumChannel;

export function isWebhookGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is WebhookGameChannel {
	if (channel && "isThread" in channel) {
		return channel.type === 0 //ChannelType.GuildText
			|| channel.type === 15 //ChannelType.GuildForum
			;
	}
	return false;
}
