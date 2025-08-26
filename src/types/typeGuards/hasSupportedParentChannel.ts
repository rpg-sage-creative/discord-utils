import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { SupportedChannel } from "./isSupportedChannel.js";
import { isSupportedParentChannel, type SupportedParentChannel } from "./isSupportedParentChannel.js";

type HasSupportedParentChannel = SupportedChannel & { parent: SupportedParentChannel; };

export function hasSupportedParentChannel(channel: Optional<Channel>): channel is HasSupportedParentChannel {
	if (!channel || !("parent" in channel) || !channel.parent) return false;
	return isSupportedParentChannel(channel.parent);
}