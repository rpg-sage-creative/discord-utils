import type { Optional } from "@rsc-utils/core-utils";
import { type CategoryChannel, type Channel, type ForumChannel, type TextChannel } from "discord.js";
export type SupportedParentChannel = CategoryChannel | ForumChannel | TextChannel;
export declare function isSupportedParentChannel(channel: Optional<Channel>): channel is SupportedParentChannel;
