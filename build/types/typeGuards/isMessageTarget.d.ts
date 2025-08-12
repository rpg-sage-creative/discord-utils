import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, DMChannel, PartialUser, User } from "discord.js";
import type { TextGameChannel } from "./isTextGameChannel.js";
export type MessageTarget = DMChannel | TextGameChannel | User;
export declare function isMessageTarget(value: Optional<Channel | User | PartialUser>): value is MessageTarget;
