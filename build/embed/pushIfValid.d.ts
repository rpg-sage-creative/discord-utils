import type { Optional } from "@rsc-utils/core-utils";
import type { EmbedBuilder } from "./EmbedBuilder.js";
/** Pushes an embed to an array only if the resulting array is within allowed embed length limits. */
export declare function pushIfValid(embeds: EmbedBuilder[], embed: Optional<EmbedBuilder>): boolean;
