import { type MessageCreateOptions, type WebhookMessageCreateOptions, type WebhookMessageEditOptions } from "discord.js";
type Options = WebhookMessageCreateOptions | WebhookMessageEditOptions | MessageCreateOptions;
/** Returns true if all lengths of the given options are under the allowed values for a single messge post. */
export declare function validateMessageOptions<T extends Options>(options: T): boolean;
export {};
