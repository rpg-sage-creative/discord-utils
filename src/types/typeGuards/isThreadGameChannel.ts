import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, ChannelType, PrivateThreadChannel, PublicThreadChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";

export type PublicThreadGameChannel = PublicThreadChannel & {
	type: ChannelType.PublicThread;
};

/** Channels Sage can check notpermissions in. */
export type ThreadGameChannel = PublicThreadGameChannel | PrivateThreadChannel;

export function isThreadGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is ThreadGameChannel {
	if (channel && "isThread" in channel) {
		return channel.type === 11 //ChannelType.PublicThread
			|| channel.type === 12 //ChannelType.PrivateThread
			;
	}
	return false;
}