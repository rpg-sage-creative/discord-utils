import type { MessageOptions, WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
type Options = WebhookMessageOptions | WebhookEditMessageOptions | MessageOptions;
/** Used to convert a single message options object into an array to ensure we don't break posting limits. */
export declare function splitMessageOptions<T extends Options>(options: T): T[];
export {};
