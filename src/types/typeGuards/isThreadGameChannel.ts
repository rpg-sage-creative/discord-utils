import type { Optional } from "@rsc-utils/core-utils";
import type { AnyThreadChannel, Channel } from "discord.js";
import type { UserOrPartial } from "../types.js";
import { isGameChannel } from "./isGameChannel.js";

/** Channels Sage can check notpermissions in. */
export type ThreadGameChannel = AnyThreadChannel;

export function isThreadGameChannel(channel?: Optional<Channel | UserOrPartial>): channel is ThreadGameChannel {
	return isGameChannel(channel) && channel.isThread();
}