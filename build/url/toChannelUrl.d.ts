import { type Channel, type Message, type MessageReference } from "discord.js";
import { type DiscordKey } from "../DiscordKey.js";
export declare function toChannelUrl(ref: Channel | DiscordKey | Message | MessageReference): string;
