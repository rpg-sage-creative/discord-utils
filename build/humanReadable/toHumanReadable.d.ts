import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Guild, GuildMember, GuildPreview, Role, Webhook } from "discord.js";
import type { MessageOrPartial, UserResolvable } from "../types/types.js";
export type Readable = Channel | Guild | GuildPreview | GuildMember | MessageOrPartial | Role | UserResolvable | Webhook;
/**
 * Returns a string that represents the Discord object in a meaningful way.
 * Channels/Messages become: #channel-name
 * Guilds become: Guild Name
 * Users/GuildMembers become: @UserName.
 * Webhooks become: $WebhookName
 * @todo rename this function to something like toHumanReadableForLogging() to imply this should only be used for logging.
 */
export declare function toHumanReadable<T extends Readable>(target: T): string;
export declare function toHumanReadable<T extends Readable>(target: Optional<T>): string | undefined;
