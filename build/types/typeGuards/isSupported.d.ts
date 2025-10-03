import type { Optional, Snowflake } from "@rsc-utils/core-utils";
import type { AutocompleteInteraction, ButtonInteraction, CategoryChannel, Channel, ChannelSelectMenuInteraction, ChannelType, ChatInputCommandInteraction, DMChannel, ForumChannel, Interaction, MentionableSelectMenuInteraction, Message, MessageContextMenuCommandInteraction, ModalSubmitInteraction, PartialUser, PrimaryEntryPointCommandInteraction, PrivateThreadChannel, PublicThreadChannel, RoleSelectMenuInteraction, StringSelectMenuInteraction, TextChannel, User, UserContextMenuCommandInteraction, UserSelectMenuInteraction } from "discord.js";
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
export type SupportedChannel = SupportedDMChannel | SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export declare function isSupportedChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannel;
/** All Channels Sage can be active in. */
export type SupportedChannelOrParent = SupportedChannel | SupportedParentChannel;
export declare function isSupportedChannelOrParent(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannelOrParent;
/** NonThread Channels Sage can be active in. */
export type SupportedNonThreadChannel = SupportedDMChannel | SupportedForumChannel | SupportedTextChannel;
export declare function isSupportedNonThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedNonThreadChannel;
/** Thread Channels Sage can be active in. */
export type SupportedThreadChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel;
export declare function isSupportedThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedThreadChannel;
/** Channels with Messages (.messages) Sage can be active in. */
export type SupportedMessagesChannel = SupportedDMChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export declare function isSupportedMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedMessagesChannel;
/** Game (non DM) Channels Sage can be active in. */
export type SupportedGameChannel = SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export declare function isSupportedGameChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameChannel;
/** Game (non DM) Channels with Messages (.messages) Sage can be active in. */
export type SupportedGameMessagesChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export declare function isSupportedGameMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameMessagesChannel;
/** Channels with Webhooks (.fetchWebhooks) Sage can be active in. */
export type SupportedWebhookChannel = SupportedForumChannel | SupportedTextChannel;
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
export type SupportedMessageContextInteraction = MessageContextMenuCommandInteraction & MightHaveChannel & HasTargetMessage;
export type SupportedUserContextInteraction = UserContextMenuCommandInteraction & MightHaveChannel;
export type SupportedChannelSelectInteraction = ChannelSelectMenuInteraction & MightHaveChannel & HasMessage;
export type SupportedMentionableSelectInteraction = MentionableSelectMenuInteraction & MightHaveChannel & HasMessage;
export type SupportedRoleSelectInteraction = RoleSelectMenuInteraction & MightHaveChannel & HasMessage;
export type SupportedStringSelectInteraction = StringSelectMenuInteraction & MightHaveChannel & HasMessage;
export type SupportedUserSelectInteraction = UserSelectMenuInteraction & MightHaveChannel & HasMessage;
export type SupportedButtonInteraction = ButtonInteraction & MightHaveChannel & HasMessage;
export type SupportedAutocompleteInteraction = AutocompleteInteraction & MightHaveChannel;
export type SupportedModalSubmitInteraction = ModalSubmitInteraction & MightHaveChannel & MightHaveMessage;
export type SupportedEntryPointInteraction = PrimaryEntryPointCommandInteraction & MightHaveChannel;
export type SupportedInteraction = SupportedSlashCommandInteraction | SupportedMessageContextInteraction | SupportedUserContextInteraction | SupportedChannelSelectInteraction | SupportedMentionableSelectInteraction | SupportedRoleSelectInteraction | SupportedStringSelectInteraction | SupportedUserSelectInteraction | SupportedButtonInteraction | SupportedAutocompleteInteraction | SupportedModalSubmitInteraction | SupportedEntryPointInteraction;
export declare function isSupportedInteraction(interaction: Optional<Interaction>): interaction is SupportedInteraction;
export type SupportedRepliableInteraction = Exclude<SupportedInteraction, SupportedAutocompleteInteraction>;
export declare function isSupportedRepliableInteraction(interaction: Optional<Interaction>): interaction is SupportedRepliableInteraction;
