import type { Optional } from "@rsc-utils/core-utils";
import type { AutocompleteInteraction, ButtonInteraction, CategoryChannel, Channel, ChannelSelectMenuInteraction, ChatInputCommandInteraction, DMChannel, ForumChannel, Interaction, MentionableSelectMenuInteraction, Message, MessageContextMenuCommandInteraction, ModalSubmitInteraction, PartialUser, PrimaryEntryPointCommandInteraction, PrivateThreadChannel, PublicThreadChannel, RoleSelectMenuInteraction, StringSelectMenuInteraction, TextChannel, User, UserContextMenuCommandInteraction, UserSelectMenuInteraction } from "discord.js";

export type SupportedForumChannel = ForumChannel & { parent:CategoryChannel | null; };
export type SupportedTextChannel = TextChannel & { parent:CategoryChannel | null; };
export type SupportedPrivateThreadChannel = PrivateThreadChannel & { parent: SupportedForumChannel | SupportedTextChannel | null; };
export type SupportedPublicThreadChannel<Forum extends boolean = boolean> = PublicThreadChannel<Forum> & { parent: SupportedForumChannel | SupportedTextChannel; };

export type HasSupportedParentChannel = SupportedChannel & { parent: SupportedParentChannel; };
export function hasSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is HasSupportedParentChannel {
	if (!channel || !("parent" in channel) || !channel.parent) return false;
	return isSupportedParentChannel(channel.parent);
}

/** All valid parent "Channels" for Channels Sage can be active in. */
export type SupportedParentChannel = CategoryChannel | SupportedForumChannel | SupportedTextChannel;
export function isSupportedParentChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedParentChannel {
	if (!channel || !("type" in channel)) return false;
	switch(channel.type) {
		case 0: return !channel.parent || isSupportedParentChannel(channel.parent);  // ChannelType.GuildText
		case 4: return true;                                                         // ChannelType.GuildCategory
		case 15: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildForum
		default: return false;
	}
}

/** All Channels Sage can be active in. */
export type SupportedChannel = DMChannel | SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export function isSupportedChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedChannel {
	if (!channel || !("type" in channel)) return false;
	switch(channel.type) {
		case 0: return !channel.parent || isSupportedParentChannel(channel.parent);  // ChannelType.GuildText
		case 1: return true;                                                         // ChannelType.DM
		case 11: return isSupportedParentChannel(channel.parent);                    // ChannelType.PublicThread
		case 12: return isSupportedParentChannel(channel.parent);                    // ChannelType.PrivateThread
		case 15: return !channel.parent || isSupportedParentChannel(channel.parent); // ChannelType.GuildForum
		default: return false;
	}
}

/** NonThread Channels Sage can be active in. */
export type SupportedNonThreadChannel = DMChannel | SupportedForumChannel | SupportedTextChannel;
export function isSupportedNonThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedNonThreadChannel {
	return isSupportedChannel(channel) && !channel.isThread();
}

/** Thread Channels Sage can be active in. */
export type SupportedThreadChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel;
export function isSupportedThreadChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedThreadChannel {
	return isSupportedChannel(channel) && channel.isThread();
}

/** Channels with Messages (.messages) Sage can be active in. */
export type SupportedMessagesChannel = DMChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export function isSupportedMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedMessagesChannel {
	return isSupportedChannel(channel) && "messages" in channel;
}

/** Game (non DM) Channels Sage can be active in. */
export type SupportedGameChannel = SupportedForumChannel | SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export function isSupportedGameChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameChannel {
	return isSupportedChannel(channel) && !channel.isDMBased();
}

/** Game (non DM) Channels with Messages (.messages) Sage can be active in. */
export type SupportedGameMessagesChannel = SupportedPrivateThreadChannel | SupportedPublicThreadChannel | SupportedTextChannel;
export function isSupportedGameMessagesChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedGameMessagesChannel {
	return isSupportedChannel(channel) && !channel.isDMBased() && "messages" in channel;
}

/** Channels with Webhooks (.fetchWebhooks) Sage can be active in. */
export type SupportedWebhookChannel = SupportedForumChannel | SupportedTextChannel;
export function isSupportedWebhookChannel(channel: Optional<Channel | User | PartialUser>): channel is SupportedWebhookChannel {
	return isSupportedChannel(channel) && "fetchWebhooks" in channel;
}

export type SupportedTarget = SupportedMessagesChannel | User;
export function isSupportedTarget(target: Optional<Channel | User | PartialUser>): target is SupportedTarget {
	if (!target) return false;
	if ("type" in target) return isSupportedMessagesChannel(target);
	return !target.partial;
}

export type MightHaveChannel = { channel: SupportedMessagesChannel | null; };
export type MightHaveMessage = { message: Message & { channel:SupportedMessagesChannel | null; } | null; };
export type HasMessage = { message: Message & { channel:SupportedMessagesChannel | null; }; };
export type HasTargetMessage = { targetMessage: Message & { channel:SupportedMessagesChannel | null; }; };

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

export type SupportedInteraction = SupportedSlashCommandInteraction
	| SupportedMessageContextInteraction | SupportedUserContextInteraction
	| SupportedChannelSelectInteraction | SupportedMentionableSelectInteraction | SupportedRoleSelectInteraction | SupportedStringSelectInteraction | SupportedUserSelectInteraction
	| SupportedButtonInteraction
	| SupportedAutocompleteInteraction
	| SupportedModalSubmitInteraction
	| SupportedEntryPointInteraction;
export function isSupportedInteraction(interaction: Optional<Interaction>): interaction is SupportedInteraction {
	if (!interaction) return false;

	// all need a valid channel
	if (interaction.channel && !isSupportedChannel(interaction.channel)) return false;

	// message context needs targetMessage to have a valid channel
	if ("targetMessage" in interaction && !isSupportedChannel(interaction.targetMessage.channel)) return false;

	// select / button / modal need message to have a valid channel
	if ("message" in interaction && interaction.message && !isSupportedChannel(interaction.message.channel)) return false;

	// otherwise ...
	return true;
}

export type SupportedRepliableInteraction = Exclude<SupportedInteraction, SupportedAutocompleteInteraction>;
export function isSupportedRepliableInteraction(interaction: Optional<Interaction>): interaction is SupportedRepliableInteraction {
	return isSupportedInteraction(interaction) && interaction.isRepliable();
}