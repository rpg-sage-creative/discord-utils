import { MessageOptions, WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
type MsgOptions = WebhookMessageOptions | WebhookEditMessageOptions | MessageOptions;
type ConvertOptions = {
    contentToEmbeds?: boolean;
    embedsToContent?: boolean;
};
/** Used to convert a single message options object into an array to ensure we don't break posting limits. */
export declare function splitMessageOptions<T extends MsgOptions>(msgOptions: T, convertOptions?: ConvertOptions): T[];
export {};
