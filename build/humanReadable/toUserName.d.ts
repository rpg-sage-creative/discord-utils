import type { Optional } from "@rsc-utils/core-utils";
import type { APIUser, PartialRecipient, PartialUser, User } from "discord.js";
type UserResolvable = User | PartialUser | APIUser | PartialRecipient;
/** Returns the user name as a readable mention or "@UnknownUser" */
export declare function toUserName(user: Optional<UserResolvable>): string;
export {};
