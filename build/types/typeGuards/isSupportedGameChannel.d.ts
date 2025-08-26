import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type ForumChannel, type PrivateThreadChannel, type PublicThreadChannel, type TextChannel } from "discord.js";
export type SupportedGameChannel = ForumChannel | PrivateThreadChannel | PublicThreadChannel | TextChannel;
export declare function isSupportedGameChannel(channel: Optional<Channel>): channel is SupportedGameChannel;
