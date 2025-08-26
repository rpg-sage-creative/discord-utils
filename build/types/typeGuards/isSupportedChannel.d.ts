import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type DMChannel, type ForumChannel, type PrivateThreadChannel, type PublicThreadChannel, TextChannel } from "discord.js";
export type SupportedNonThreadChannel = DMChannel | ForumChannel | TextChannel;
export type SupportedThreadChannel = PrivateThreadChannel | PublicThreadChannel;
export type SupportedChannel = DMChannel | ForumChannel | PrivateThreadChannel | PublicThreadChannel | TextChannel;
export type SupportedMessagesChannel = DMChannel | PrivateThreadChannel | PublicThreadChannel | TextChannel;
export declare function isSupportedChannel(channel: Optional<Channel>): channel is SupportedChannel;
