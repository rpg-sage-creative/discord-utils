import { ModalBuilder as _ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
export class ModalBuilder extends _ModalBuilder {
    addShortText(required) {
        const index = this.components.length;
        const row = new ActionRowBuilder();
        const input = new TextInputBuilder();
        input.setStyle(TextInputStyle.Short).setCustomId(`field-${index}`).setRequired(required);
        row.addComponents(input);
        this.addComponents(row);
        return input;
    }
    addParagraph(required) {
        return this.addShortText(required).setStyle(TextInputStyle.Paragraph);
    }
}
