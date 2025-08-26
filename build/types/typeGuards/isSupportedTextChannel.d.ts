import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type DMChannel, type PrivateThreadChannel, type PublicThreadChannel, type TextChannel } from "discord.js";
export type SupportedTextChannel = DMChannel | PrivateThreadChannel | PublicThreadChannel | TextChannel;
export declare function isSupportedTextChannel(channel: Optional<Channel>): channel is SupportedTextChannel;
