import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Guild, GuildMember, GuildPreview, Webhook } from "discord.js";
import type { MessageOrPartial, UserOrPartial } from "../types/types.js";
export type Readable = Channel | Guild | GuildPreview | GuildMember | MessageOrPartial | UserOrPartial | Webhook;
/**
 * Returns a string that represents the Discord object in a meaningful way.
 * Channels/Messages become: #channel-name
 * Guilds become: Guild Name
 * Users/GuildMembers become: @UserName.
 * Webhooks become: $WebhookName
 */
export declare function toHumanReadable<T extends Readable>(target: T): string;
export declare function toHumanReadable<T extends Readable>(target: Optional<T>): string | undefined;
