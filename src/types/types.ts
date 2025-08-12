import type { AnySelectMenuInteraction, APIUser, AutocompleteInteraction, ButtonInteraction, CacheType, CommandInteraction, Message, MessageComponentInteraction, MessageReaction, MessageReference, ModalSubmitInteraction, Partialize, PartialMessage, PartialMessageReaction, PartialRecipient, PartialUser, User } from "discord.js";
import type { TextGameChannel } from "./typeGuards/isTextGameChannel.js";

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

/** Special Sage Message that type guards the channel to a TextGameChannel */
export type SMessage = Message & { channel:TextGameChannel; };
/** Partial version of SMessage */
export type SPartialMessage = Partialize<SMessage, 'type' | 'system' | 'pinned' | 'tts', 'content' | 'cleanContent' | 'author'>;

export type SMessageOrPartial = SMessage | SPartialMessage;
export type MessageOrPartial = Message | PartialMessage;

export type MessageReferenceOrPartial = MessageReference | Omit<MessageReference, "type">;

export type ReactionOrPartial = MessageReaction | PartialMessageReaction;

/** User or PartialUser */
export type UserOrPartial = User | PartialUser;

export type UserResolvable = User | PartialUser | APIUser | PartialRecipient;

//#endregion




