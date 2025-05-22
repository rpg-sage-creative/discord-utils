import type { Optional } from "@rsc-utils/core-utils";
import { type ActionRow, type Message, type MessageActionRowComponent } from "discord.js";
import type { SPartialMessage } from "../types/types.js";
export declare function getActionRows(message: Optional<Message | SPartialMessage>): ActionRow<MessageActionRowComponent>[];
