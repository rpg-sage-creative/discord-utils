import type { MessageReference } from "discord.js";
import type { DMessage } from "./types";
export declare function createMessageLink(msgOrRef: DMessage): string;
export declare function createMessageLink(msgOrRef: MessageReference): string;
