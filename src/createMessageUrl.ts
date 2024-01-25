import type { MessageReference } from "discord.js";
import { DiscordKey } from "./DiscordKey.js";
import type { DMessage } from "./types";

export function createMessageUrl(msgOrRef: DMessage | MessageReference): string {
	return DiscordKey.toMessageUrl(msgOrRef);
}