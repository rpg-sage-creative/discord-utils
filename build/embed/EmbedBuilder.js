import { MessageEmbed } from "discord.js";
export class EmbedBuilder extends MessageEmbed {
    appendDescription(appendix) {
        if (this.description && appendix) {
            this.setDescription(this.description + appendix);
        }
        else if (appendix) {
            this.setDescription(appendix);
        }
    }
}
