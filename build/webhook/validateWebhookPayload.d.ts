import type { WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
export declare function validateWebhookPayload<T extends WebhookMessageOptions | WebhookEditMessageOptions>(options: T): boolean;
