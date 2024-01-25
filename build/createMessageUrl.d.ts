import type { MessageReference } from "discord.js";
import type { DMessage } from "./types.js";
export declare function createMessageUrl(msgOrRef: DMessage | MessageReference): string;
