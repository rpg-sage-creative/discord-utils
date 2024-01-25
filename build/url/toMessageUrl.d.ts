import type { MessageReference } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
import type { DMessage } from "../types.js";
export declare function toMessageUrl(ref: DiscordKey | DMessage | MessageReference): string | null;
