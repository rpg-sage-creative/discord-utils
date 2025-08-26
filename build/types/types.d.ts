import type { AnySelectMenuInteraction, AnyThreadChannel, APIUser, AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, CommandInteraction, DMChannel, ForumChannel, MediaChannel, Message, MessageComponentInteraction, MessageReaction, MessageReference, ModalSubmitInteraction, PartialDMChannel, PartialGroupDMChannel, Partialize, PartialMessage, PartialMessageReaction, PartialRecipient, PartialUser, User } from "discord.js";
export type MessageReferenceOrPartial = MessageReference | Omit<MessageReference, "type">;
export type DInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | AutocompleteInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DRepliableInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DMBasedChannel = PartialGroupDMChannel | DMChannel | PartialDMChannel;
/** Channel you can send a message to. */
export type MessageChannel = Exclude<Channel, CategoryChannel | ForumChannel | MediaChannel | PartialGroupDMChannel>;
export type SMessage = Message & {
    channel: MessageChannel;
};
export type SPartialMessage = Partialize<SMessage, 'type' | 'system' | 'pinned' | 'tts', 'content' | 'cleanContent' | 'author'>;
export type SMessageOrPartial = SMessage | SPartialMessage;
export type MessageOrPartial = Message | PartialMessage;
/** User or Channel you can send a message to. */
export type MessageTarget = User | MessageChannel;
export type NonThreadChannel = Exclude<Channel, AnyThreadChannel>;
export type ReactionOrPartial = MessageReaction | PartialMessageReaction;
/** User or PartialUser */
export type UserOrPartial = User | PartialUser;
export type UserResolvable = User | PartialUser | APIUser | PartialRecipient;
