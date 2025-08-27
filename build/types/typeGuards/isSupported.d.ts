import type { Optional } from "@rsc-utils/core-utils";
import type { AutocompleteInteraction, ButtonInteraction, CategoryChannel, Channel, ChannelSelectMenuInteraction, ChatInputCommandInteraction, DMChannel, ForumChannel, Interaction, MentionableSelectMenuInteraction, Message, MessageContextMenuCommandInteraction, ModalSubmitInteraction, PartialUser, PrimaryEntryPointCommandInteraction, PrivateThreadChannel, PublicThreadChannel, RoleSelectMenuInteraction, StringSelectMenuInteraction, TextChannel, User, UserContextMenuCommandInteraction, UserSelectMenuInteraction } from "discord.js";
export type SupportedForumChannel = ForumChannel & {
    parent: CategoryChannel | null;
};
export type SupportedTextChannel = TextChannel & {
    parent: CategoryChannel | null;
};
export type SupportedPrivateThreadChannel = PrivateThreadChannel & {
    parent: SupportedForumChannel | SupportedTextChannel | null;
};
export type SupportedPublicThreadChannel<Forum extends boolean = boolean> = PublicThreadChannel<Forum> & {
    parent: SupportedForumChannel | SupportedTextChannel;
};
export type HasSupportedParentChannel = SupportedChannel & {
    parent: SupportedParentChannel;
};
export declare function hasSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is HasSupportedParentChannel;
/** All valid parent "Channels" for Channels Sage can be active in. */
export type SupportedParentChannel = CategoryChannel | SupportedForumChannel | SupportedTextChannel;
export declare function isSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedParentChannel;
/** All Channels Sage can be active in. */
export type SupportedChannel = DMChannel | SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export declare function isSupportedChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannel;
/** NonThread Channels Sage can be active in. */
export type SupportedNonThreadChannel = DMChannel | SupportedForumChannel | SupportedTextChannel;
export declare function isSupportedNonThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedNonThreadChannel;
/** Thread Channels Sage can be active in. */
export type SupportedThreadChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel;
export declare function isSupportedThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedThreadChannel;
/** Channels with Messages (.messages) Sage can be active in. */
export type SupportedMessagesChannel = DMChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
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
