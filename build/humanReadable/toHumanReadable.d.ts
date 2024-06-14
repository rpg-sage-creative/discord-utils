import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Guild, GuildMember, GuildPreview, Message, PartialUser, User, Webhook } from "discord.js";
type Target = Channel | Guild | GuildPreview | GuildMember | Message | PartialUser | User | Webhook;
/**
 * Returns a string that represents the Discord object in a meaningful way.
 * Channels/Messages become: #channel-name
 * Guilds become: Guild Name
 * Users/GuildMembers become: @UserName.
 * Webhooks become: $WebhookName
 */
export declare function toHumanReadable<T extends Target>(target: T): string;
export declare function toHumanReadable<T extends Target>(target: Optional<T>): string | undefined;
export {};
