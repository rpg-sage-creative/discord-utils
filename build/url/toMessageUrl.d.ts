import type { Message, MessageReference } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
export declare function toMessageUrl(ref: DiscordKey | Message | MessageReference): string | null;
