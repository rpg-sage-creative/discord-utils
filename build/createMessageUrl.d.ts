import type { MessageReference } from "discord.js";
import type { DMessage } from "./types";
export declare function createMessageUrl(msgOrRef: DMessage | MessageReference): string;
