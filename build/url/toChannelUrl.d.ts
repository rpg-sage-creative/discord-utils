import type { Channel, Message, MessageReference } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
export declare function toChannelUrl(ref: Channel | DiscordKey | Message | MessageReference): string;
