import type { AnySelectMenuInteraction, AnyThreadChannel, AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, CommandInteraction, DMChannel, ForumChannel, MediaChannel, Message, MessageComponentInteraction, MessageReaction, ModalSubmitInteraction, NonThreadGuildBasedChannel, PartialDMChannel, PartialGroupDMChannel, PartialMessage, PartialMessageReaction, PartialUser, User } from "discord.js";
export type DInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | AutocompleteInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DRepliableInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DMBasedChannel = PartialGroupDMChannel | DMChannel | PartialDMChannel;
/** Channel you can send a message to. */
export type MessageChannel = Exclude<Channel, CategoryChannel | ForumChannel | MediaChannel | PartialGroupDMChannel>;
export type MessageOrPartial = Message | PartialMessage;
/** User or Channel you can send a message to. */
export type MessageTarget = User | MessageChannel;
export type NonThreadChannel = Exclude<Channel, AnyThreadChannel>;
export type ReactionOrPartial = MessageReaction | PartialMessageReaction;
/** User or PartialUser */
export type UserOrPartial = User | PartialUser;
/** Channels that can have webhooks. */
export type WebhookChannel = Exclude<NonThreadGuildBasedChannel, CategoryChannel>;
