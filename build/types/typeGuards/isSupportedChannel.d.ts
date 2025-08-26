import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type DMChannel, type ForumChannel, type PrivateThreadChannel, type PublicThreadChannel, type TextChannel } from "discord.js";
export type SupportedChannel = DMChannel | ForumChannel | PrivateThreadChannel | PublicThreadChannel | TextChannel;
export declare function isSupportedChannel(channel: Optional<Channel>): channel is SupportedChannel;
