import type { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, CommandInteraction, DMChannel, ForumChannel, Guild, GuildPreview, MediaChannel, Message, MessageComponentInteraction, MessageReaction, ModalSubmitInteraction, NonThreadGuildBasedChannel, PartialDMChannel, PartialGroupDMChannel, PartialMessage, PartialMessageReaction, PartialUser, Role, Snowflake, User } from "discord.js";
export type DMBasedChannel = PartialGroupDMChannel | DMChannel | PartialDMChannel;
/** Channel you can send a message to. */
export type MessageChannel = Exclude<Channel, CategoryChannel | ForumChannel | MediaChannel | PartialGroupDMChannel>;
/** User or Channel you can send a message to. */
export type MessageTarget = User | MessageChannel;
/** Channels that webhooks can be sent to. */
export type WebhookChannel = Exclude<NonThreadGuildBasedChannel, CategoryChannel>;
export type MessageOrPartial = Message | PartialMessage;
export type ReactionOrPartial = MessageReaction | PartialMessageReaction;
/** User or PartialUser */
export type UserOrPartial = User | PartialUser;
/** User or PartialUser or Snowflake */
export type UserIdResolvable = User | PartialUser | Snowflake;
/** Guild or GuildPreview or Snowflake */
export type GuildIdResolvable = Guild | GuildPreview | Snowflake;
/** Role or Snowflake */
export type RoleIdResolvable = Role | Snowflake;
/** Channel or Snowflake */
export type ChannelIdResolvable = Channel | Snowflake;
export type DInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | AutocompleteInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
export type DRepliableInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> | AnySelectMenuInteraction<Cached> | MessageComponentInteraction<Cached> | CommandInteraction<Cached> | ModalSubmitInteraction<Cached>;
