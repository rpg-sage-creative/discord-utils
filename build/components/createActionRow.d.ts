import { ActionRowBuilder, type MessageActionRowComponentBuilder } from "discord.js";
/** Convenience method for creating and type casting a new ActionRowBuilder. */
export declare function createActionRow<T extends MessageActionRowComponentBuilder>(...components: T[]): ActionRowBuilder<T>;
