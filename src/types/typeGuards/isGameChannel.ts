import type { Optional } from "@rsc-utils/core-utils";
import type { CategoryChannel, Channel, ForumChannel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import type { ThreadGameChannel } from "./isThreadGameChannel.js";

type HasGameChannelParent = { parent: TextChannel | ForumChannel | null; };

/** These are the only channels Sage should function in. */
export type GameChannel = TextChannel | ForumChannel | CategoryChannel
	| (ThreadGameChannel & HasGameChannelParent);

export function isGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is GameChannel {
	if (channel && "isThread" in channel) {
		return channel.type === 0 //ChannelType.GuildText
			|| channel.type === 4 //ChannelType.GuildCategory
			|| channel.type === 11 //ChannelType.PublicThread
			|| channel.type === 12 //ChannelType.PrivateThread
			|| channel.type === 15 //ChannelType.GuildForum
			;
	}
	return false;
}