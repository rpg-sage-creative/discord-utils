import type { Optional } from "@rsc-utils/core-utils";
import type { AnyThreadChannel, Channel, TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import { isGameChannel } from "./isGameChannel.js";

/** Channels Sage can send messages to. */
export type TextGameChannel = TextChannel | AnyThreadChannel;

export function isTextGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is TextGameChannel {
	return isGameChannel(channel) && "send" in channel;
}