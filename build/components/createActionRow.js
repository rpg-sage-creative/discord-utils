import { ActionRowBuilder } from "discord.js";
/** Convenience method for creating and type casting a new ActionRowBuilder. */
export function createActionRow(...components) {
    return new ActionRowBuilder().setComponents(...components);
}
