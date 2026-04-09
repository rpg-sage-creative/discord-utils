import { type Snowflake } from "@rsc-utils/core-utils";
import { ActionRow, Attachment, AttachmentBuilder, Message, Webhook, type MessageActionRowComponent } from "discord.js";
import { DiscordApiError } from "./DiscordApiError.js";
import type { EmbedResolvable } from "./embed/EmbedResolvable.js";
import { type SplitOptions } from "./messageOptions/splitMessageOptions.js";
import type { SupportedMessagesChannel, SupportedTarget } from "./types/index.js";
export type AttachmentResolvable = Attachment | AttachmentBuilder;
type SageCache = {
    canSendMessageToChannel: (channel: SupportedMessagesChannel) => Promise<boolean>;
    user: {
        sagePostType?: number;
    };
};
type SendToArgs = {
    avatarURL?: string;
    components?: ActionRow<MessageActionRowComponent>[];
    content?: string;
    embedContent?: string;
    embeds?: EmbedResolvable[];
    files?: AttachmentResolvable[];
    replyingTo?: string;
    sageCache: SageCache;
    target: SupportedTarget | Webhook;
    threadId?: Snowflake;
    username?: string;
};
/**
 * If Sage doesn't have permissions to send to this channel/thread, then undefined is returned.
 * If catchHandler isn't given, then an array of Message, DiscordApiError, or undefined is returned.
 * If catchHandler is given, then an array of Message is returned and catchHandler is called for each error.
 * If multiple sends are attempted and an error occurs, all subsequent send attempts are skipped.
 */
export declare function sendTo(sendArgs: SendToArgs, splitOptions: SplitOptions): Promise<(Message | DiscordApiError | undefined)[] | undefined>;
export declare function sendTo(sendArgs: SendToArgs, splitOptions: SplitOptions, catchHandler: (err: unknown) => void): Promise<Message[] | undefined>;
export {};
