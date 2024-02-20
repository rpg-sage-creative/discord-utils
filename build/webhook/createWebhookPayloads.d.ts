import type { WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
/** Used to convert a single webhook options object into an array to ensure we don't break posting limits. */
export declare function createWebhookPayloads<T extends WebhookMessageOptions | WebhookEditMessageOptions>(options: T): T[];
