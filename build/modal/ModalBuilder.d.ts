import type { Optional } from "@rsc-utils/core-utils";
import { ModalBuilder as _ModalBuilder, TextInputBuilder } from "discord.js";
type Options = {
    maxLength?: number;
    required?: boolean;
};
export declare class ModalBuilder extends _ModalBuilder {
    addShortText(): TextInputBuilder;
    addShortText(required: Optional<boolean>): TextInputBuilder;
    addShortText(options: Optional<Options>): TextInputBuilder;
    addParagraph(): TextInputBuilder;
    addParagraph(required: Optional<boolean>): TextInputBuilder;
    addParagraph(options: Optional<Options>): TextInputBuilder;
}
export {};
