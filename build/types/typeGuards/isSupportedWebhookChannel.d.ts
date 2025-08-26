import type { Optional } from "@rsc-utils/core-utils";
import { type Channel, type ForumChannel, type TextChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
export type SupportedWebhookChannel = ForumChannel | TextChannel;
export declare function isSupportedWebhookChannel(channel: Optional<Channel | UserOrPartial>): channel is SupportedWebhookChannel;
