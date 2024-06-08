import { type ColorResolvable, type MessageCreateOptions, type MessageEditOptions, type WebhookMessageCreateOptions, type WebhookMessageEditOptions } from "discord.js";
type MessageOptions = MessageCreateOptions | MessageEditOptions | WebhookMessageCreateOptions | WebhookMessageEditOptions;
type SplitMessageOptions<T extends MessageOptions> = T & {
    embedContent?: string;
    replyingTo?: string;
};
export type SplitOptions = {
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
export declare function splitMessageOptions<T extends MessageOptions>(msgOptions: SplitMessageOptions<T>, splitOptions?: SplitOptions): T[];
export {};
