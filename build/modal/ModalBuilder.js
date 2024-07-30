import { ModalBuilder as _ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
export class ModalBuilder extends _ModalBuilder {
    addShortText(arg) {
        const index = this.components.length;
        const row = new ActionRowBuilder();
        const input = new TextInputBuilder();
        input.setStyle(TextInputStyle.Short);
        input.setCustomId(`field-${index}`);
        if (arg) {
            if (typeof (arg) === "boolean") {
                input.setRequired(arg === true);
            }
            else {
                input.setRequired(arg?.required === true);
                if (arg.maxLength) {
                    input.setMaxLength(arg.maxLength);
                }
            }
        }
        row.addComponents(input);
        this.addComponents(row);
        return input;
    }
    addParagraph(arg) {
        return this.addShortText(arg).setStyle(TextInputStyle.Paragraph);
    }
}
