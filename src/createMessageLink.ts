import type { MessageReference } from "discord.js";
import type { DMessage } from "./types";

export function createMessageLink(msgOrRef: DMessage): string;
export function createMessageLink(msgOrRef: MessageReference): string;
export function createMessageLink(msgOrRef: DMessage | MessageReference): string {
	if ("messageId" in msgOrRef) {
		return `https://discord.com/channels/${msgOrRef.guildId}/${msgOrRef.channelId}/${msgOrRef.messageId}`;
	}
	return `https://discord.com/channels/${msgOrRef.guildId}/${msgOrRef.channelId}/${msgOrRef.id}`;
}