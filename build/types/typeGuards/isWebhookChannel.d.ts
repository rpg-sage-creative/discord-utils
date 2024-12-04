import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { UserOrPartial, WebhookChannel } from "../types.js";
export declare function isWebhookChannel(value: Optional<Channel | UserOrPartial>): value is WebhookChannel;
