import { type Optional } from "@rsc-utils/core-utils";
import { type Channel, type GuildMember, type Message, type User, type Webhook } from "discord.js";
type Target = Channel | Message | User | GuildMember | Webhook;
/**
 * Returns a string that represents the Discord object in a meaningful way.
 * Users become @UserName.
 * Channels become #channel-name
 */
export declare function toHumanReadable<T extends Target>(target: T): string;
export declare function toHumanReadable<T extends Target>(target: Optional<T>): string | null;
export {};
