import { ColorResolvable, MessageOptions, WebhookEditMessageOptions, WebhookMessageOptions } from "discord.js";
type MsgOptions = WebhookMessageOptions | WebhookEditMessageOptions | MessageOptions;
type SplitOptions = {
    /** Use in place of blank content (null, undefined, empty string, whitespcae only), ie: ZERO_WIDTH_SPACE */
    blankContentValue?: string;
    /** Convert all content to embeds? */
    contentToEmbeds?: boolean;
    /** Convert all embeds to content? */
    embedsToContent?: boolean;
    /** Color of the embed */
    embedColor?: ColorResolvable;
};
/** Used to convert a single message options object into an array to ensure we don't break posting limits. */
export declare function splitMessageOptions<T extends MsgOptions>(msgOptions: T, splitOptions?: SplitOptions): T[];
export {};
