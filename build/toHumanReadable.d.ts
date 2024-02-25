import type { Optional } from "@rsc-utils/type-utils";
import type { GuildMember, Webhook } from "discord.js";
import type { DChannel, DForumChannel, DMessage, DUser } from "./types.js";
type Target = DChannel | DForumChannel | DMessage | DUser | GuildMember | Webhook;
/**
 * Returns a string that represents the Discord object in a meaningful way.
 * Users become @UserName.
 * Channels become #channel-name
 */
export declare function toHumanReadable<T extends Target>(target: T): string;
export declare function toHumanReadable<T extends Target>(target: Optional<T>): string | null;
export {};
