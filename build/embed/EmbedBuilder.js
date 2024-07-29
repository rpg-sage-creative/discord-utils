import { EmbedBuilder as _EmbedBuilder } from "discord.js";
export class EmbedBuilder extends _EmbedBuilder {
    appendDescription(appendix, delimiter) {
        if (this.data.description && appendix) {
            this.setDescription(this.data.description + (delimiter ?? "") + appendix);
        }
        else if (appendix) {
            this.setDescription(appendix);
        }
    }
    getDescription() {
        return this.data.description;
    }
}
