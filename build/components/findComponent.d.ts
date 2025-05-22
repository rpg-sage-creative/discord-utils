import type { Optional } from "@rsc-utils/core-utils";
import type { Message, MessageActionRowComponent } from "discord.js";
import type { SPartialMessage } from "../types/types.js";
export declare function findComponent<T extends MessageActionRowComponent>(message: Optional<Message | SPartialMessage>, customId: string): T | undefined;
