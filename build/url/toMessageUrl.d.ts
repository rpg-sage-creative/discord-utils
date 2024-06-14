import type { MessageReference } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
import type { MessageOrPartial } from "../types.js";
export declare function toMessageUrl(ref: DiscordKey | MessageOrPartial | MessageReference): string | undefined;
