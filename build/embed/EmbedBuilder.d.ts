import type { Optional } from "@rsc-utils/core-utils";
import { EmbedBuilder as _EmbedBuilder } from "discord.js";
export declare class EmbedBuilder extends _EmbedBuilder {
    appendDescription(appendix: Optional<string>, delimiter?: string): void;
    getDescription(): string | undefined;
}
