import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { AutocompleteInteraction, ButtonInteraction, CacheType, CategoryChannel, Channel, ChannelSelectMenuInteraction, ChannelType, ChatInputCommandInteraction, DMChannel, ForumChannel, Interaction, MentionableSelectMenuInteraction, Message, MessageContextMenuCommandInteraction, ModalSubmitInteraction, PartialUser, PrimaryEntryPointCommandInteraction, PrivateThreadChannel, PublicThreadChannel, RoleSelectMenuInteraction, StringSelectMenuInteraction, TextChannel, User, UserContextMenuCommandInteraction, UserSelectMenuInteraction, VoiceChannel } from "discord.js";
export type SupportedCategoryChannel = CategoryChannel & {
    id: Snowflake;
};
export type SupportedDMChannel = DMChannel & {
    id: Snowflake;
};
export type SupportedForumChannel = ForumChannel & {
    id: Snowflake;
    parent: CategoryChannel | null;
};
export type SupportedTextChannel = TextChannel & {
    id: Snowflake;
    parent: CategoryChannel | null;
};
export type SupportedVoiceChannel = VoiceChannel & {
    id: Snowflake;
    parent: CategoryChannel | null;
};
export type SupportedPrivateThreadChannel = PrivateThreadChannel & {
    id: Snowflake;
    parent: SupportedForumChannel | SupportedTextChannel | null;
};
export type SupportedPublicThreadChannel<Forum extends boolean = boolean> = PublicThreadChannel<Forum> & {
    id: Snowflake;
    parent: SupportedForumChannel | SupportedTextChannel;
    type: ChannelType.PublicThread;
};
export type HasSupportedParentChannel = SupportedChannel & {
    id: Snowflake;
    parent: SupportedParentChannel;
};
export declare function hasSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is HasSupportedParentChannel;
/** All valid parent "Channels" for Channels Sage can be active in. */
export type SupportedParentChannel = SupportedCategoryChannel | SupportedForumChannel | SupportedTextChannel;
export declare function isSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedParentChannel;
/** All Text Channels Sage can be active in. */
export type SupportedChannel = SupportedDMChannel | SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannel;
/** All Channels Sage can be active in. */
export type SupportedChannelOrParent = SupportedChannel | SupportedParentChannel;
export declare function isSupportedChannelOrParent(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannelOrParent;
/** NonThread Channels Sage can be active in. */
export type SupportedNonThreadChannel = SupportedDMChannel | SupportedForumChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedNonThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedNonThreadChannel;
/** Thread Channels Sage can be active in. */
export type SupportedThreadChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel;
export declare function isSupportedThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedThreadChannel;
/** Channels with Messages (.messages) Sage can be active in. */
export type SupportedMessagesChannel = SupportedDMChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedMessagesChannel;
/** Game (non DM) Channels Sage can be active in. */
export type SupportedGameChannel = SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedGameChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameChannel;
/** Game (non DM) Channels with Messages (.messages) Sage can be active in. */
export type SupportedGameMessagesChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedGameMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameMessagesChannel;
/** Channels with Webhooks (.fetchWebhooks) Sage can be active in. */
export type SupportedWebhookChannel = SupportedForumChannel | SupportedTextChannel | SupportedVoiceChannel;
export declare function isSupportedWebhookChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedWebhookChannel;
export type SupportedTarget = SupportedMessagesChannel | User;
export declare function isSupportedTarget(target: Optional<Channel | User | PartialUser>): target is SupportedTarget;
export type MightHaveChannel = {
    channel: SupportedMessagesChannel | null;
};
export type MightHaveMessage = {
    message: Message & {
        channel: SupportedMessagesChannel | null;
    } | null;
};
export type HasMessage = {
    message: Message & {
        channel: SupportedMessagesChannel | null;
    };
};
export type HasTargetMessage = {
    targetMessage: Message & {
        channel: SupportedMessagesChannel | null;
    };
};
export type SupportedSlashCommandInteraction = ChatInputCommandInteraction & MightHaveChannel;
export type SupportedMessageContextInteraction<Cached extends CacheType = CacheType> = MessageContextMenuCommandInteraction<Cached> & MightHaveChannel & HasTargetMessage;
export type SupportedUserContextInteraction<Cached extends CacheType = CacheType> = UserContextMenuCommandInteraction<Cached> & MightHaveChannel;
export type SupportedChannelSelectInteraction<Cached extends CacheType = CacheType> = ChannelSelectMenuInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedMentionableSelectInteraction<Cached extends CacheType = CacheType> = MentionableSelectMenuInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedRoleSelectInteraction<Cached extends CacheType = CacheType> = RoleSelectMenuInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedStringSelectInteraction<Cached extends CacheType = CacheType> = StringSelectMenuInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedUserSelectInteraction<Cached extends CacheType = CacheType> = UserSelectMenuInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedButtonInteraction<Cached extends CacheType = CacheType> = ButtonInteraction<Cached> & MightHaveChannel & HasMessage;
export type SupportedAutocompleteInteraction<Cached extends CacheType = CacheType> = AutocompleteInteraction<Cached> & MightHaveChannel;
export type SupportedModalSubmitInteraction<Cached extends CacheType = CacheType> = ModalSubmitInteraction<Cached> & MightHaveChannel & MightHaveMessage;
export type SupportedEntryPointInteraction<Cached extends CacheType = CacheType> = PrimaryEntryPointCommandInteraction<Cached> & MightHaveChannel;
export type SupportedInteraction<Cached extends CacheType = CacheType> = SupportedSlashCommandInteraction | SupportedMessageContextInteraction<Cached> | SupportedUserContextInteraction<Cached> | SupportedChannelSelectInteraction<Cached> | SupportedMentionableSelectInteraction<Cached> | SupportedRoleSelectInteraction<Cached> | SupportedStringSelectInteraction<Cached> | SupportedUserSelectInteraction<Cached> | SupportedButtonInteraction<Cached> | SupportedAutocompleteInteraction<Cached> | SupportedModalSubmitInteraction<Cached> | SupportedEntryPointInteraction<Cached>;
export declare function isSupportedInteraction(interaction: Optional<Interaction>): interaction is SupportedInteraction;
export type SupportedRepliableInteraction<Cached extends CacheType = CacheType> = Exclude<SupportedInteraction<Cached>, SupportedAutocompleteInteraction>;
export declare function isSupportedRepliableInteraction(interaction: Optional<Interaction>): interaction is SupportedRepliableInteraction;
