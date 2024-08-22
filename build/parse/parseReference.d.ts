import type { Optional } from "@rsc-utils/core-utils";
import type { MessageReference } from "discord.js";
type ReferenceType = "channel" | "message";
/** Parses a discord message url into a MessageReference. */
export declare function parseReference(url: Optional<string>, type: ReferenceType): MessageReference | undefined;
export {};
