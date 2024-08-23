import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, MessageReference } from "discord.js";
import type { MessageOrPartial } from "../types/types.js";
type ReferenceType = "channel" | "message";
/** Parses a discord message url into a MessageReference based on the type of url expected. */
export declare function parseReference(value: Optional<string>, type: ReferenceType): MessageReference | undefined;
/** Parses a discord Message or Channel into a MessageReference. */
export declare function parseReference(value: Optional<Channel | MessageOrPartial>): MessageReference | undefined;
export {};
