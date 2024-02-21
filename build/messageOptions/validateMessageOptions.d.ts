import type { MessageOptions, WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
type Options = WebhookMessageOptions | WebhookEditMessageOptions | MessageOptions;
/** Returns true if all lengths of the given options are under the allowed values for a single messge post. */
export declare function validateMessageOptions<T extends Options>(options: T): boolean;
export {};
