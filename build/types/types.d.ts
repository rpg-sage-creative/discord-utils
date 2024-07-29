import type { Optional } from "@rsc-utils/core-utils";
import type { AnySelectMenuInteraction, AnyThreadChannel, AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, CommandInteraction, DMChannel, ForumChannel, GuildBasedChannel, Interaction, MediaChannel, Message, MessageComponentInteraction, MessageReaction, ModalSubmitInteraction, NonThreadGuildBasedChannel, PartialDMChannel, PartialGroupDMChannel, PartialMessage, PartialMessageReaction, PartialUser, User } from "discord.js";
export type DInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | AutocompleteInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DRepliableInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
type ChannelOrUser = Channel | UserOrPartial;
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
export declare function isChannel(value: Optional<ChannelOrUser>): value is Channel;
export declare function isDMBased(value: Optional<ChannelOrUser>): value is DMBasedChannel;
export declare function isGroupDMBased(value: Optional<ChannelOrUser>): value is PartialGroupDMChannel;
export declare function isGuildBased(value: Optional<ChannelOrUser>): value is GuildBasedChannel;
export declare function isMessage<T extends MessageOrPartial>(value: Optional<Channel | Interaction | T | User>): value is T;
export declare function isMessageTarget(value: Optional<ChannelOrUser>): value is MessageTarget;
export declare function isNonThread(value: Optional<ChannelOrUser>): value is NonThreadChannel;
export declare function isThread(value: Optional<ChannelOrUser>): value is AnyThreadChannel;
export declare function isUser(value: Optional<ChannelOrUser>): value is UserOrPartial;
export declare function isWebhookChannel(value: Optional<ChannelOrUser>): value is WebhookChannel;
export {};
