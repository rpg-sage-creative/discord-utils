import { ActionRowBuilder } from "discord.js";
export function createActionRow(...components) {
    return new ActionRowBuilder().setComponents(...components);
}
