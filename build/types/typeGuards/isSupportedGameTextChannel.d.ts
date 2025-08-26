import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type PrivateThreadChannel, type PublicThreadChannel, type TextChannel } from "discord.js";
export type SupportedGameTextChannel = PrivateThreadChannel | PublicThreadChannel | TextChannel;
export declare function isSupportedGameTextChannel(channel: Optional<Channel>): channel is SupportedGameTextChannel;
