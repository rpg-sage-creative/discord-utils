import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, Interaction, Message, PartialMessage, User } from "discord.js";

export function isMessage<T extends Message | PartialMessage>(value: Optional<Channel | Interaction | T | User>): value is T {
	return value ? "author" in value : false;
}