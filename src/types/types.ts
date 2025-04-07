import type { AnySelectMenuInteraction, AnyThreadChannel, APIUser, AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, CommandInteraction, DMChannel, ForumChannel, MediaChannel, Message, MessageComponentInteraction, MessageReaction, ModalSubmitInteraction, NonThreadGuildBasedChannel, PartialDMChannel, PartialGroupDMChannel, PartialMessage, PartialMessageReaction, PartialRecipient, PartialUser, User } from "discord.js";

export type DInteraction<Cached extends CacheType = CacheType>
	= ButtonInteraction<Cached> // button
	| AnySelectMenuInteraction<Cached> // select
	// there are more select menu interactions now
	| MessageComponentInteraction<Cached> // button or select or text
	| AutocompleteInteraction<Cached> // autocomplete
	| CommandInteraction<Cached> // slash
	| ModalSubmitInteraction<Cached> // modal
	;

export type DRepliableInteraction<Cached extends CacheType = CacheType>
	= ButtonInteraction<Cached>
	| AnySelectMenuInteraction<Cached>
	// there are more select menu interactions now
	| MessageComponentInteraction<Cached>
	| CommandInteraction<Cached>
	| ModalSubmitInteraction<Cached>
	;

export type DMBasedChannel = PartialGroupDMChannel | DMChannel | PartialDMChannel;

/** Channel you can send a message to. */
export type MessageChannel = Exclude<Channel, CategoryChannel | ForumChannel | MediaChannel | PartialGroupDMChannel>;

export type MessageOrPartial = Message | PartialMessage;

/** User or Channel you can send a message to. */
export type MessageTarget = User | MessageChannel;

export type NonThreadChannel = Exclude<Channel, AnyThreadChannel>;

export type ReactionOrPartial = MessageReaction | PartialMessageReaction;

export type UserOrPartial = User | PartialUser;

export type UserResolvable = User | PartialUser | APIUser | PartialRecipient;

/** Channels that can have webhooks. */
export type WebhookChannel = Exclude<NonThreadGuildBasedChannel, CategoryChannel>;
