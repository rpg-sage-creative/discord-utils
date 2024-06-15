import { type Channel, type MessageReference } from "discord.js";
import { type MessageOrPartial } from "../types/types.js";
export declare function toChannelUrl(ref: Channel | MessageOrPartial | MessageReference): string;
