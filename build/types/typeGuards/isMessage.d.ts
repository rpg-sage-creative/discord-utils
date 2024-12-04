import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Interaction, Message, PartialMessage, User } from "discord.js";
export declare function isMessage<T extends Message | PartialMessage>(value: Optional<Channel | Interaction | T | User>): value is T;
