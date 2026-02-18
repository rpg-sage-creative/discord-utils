import type { BuilderOption, SlashCommandOption } from "../index.js";
/** Expanded setName that also calls setRequired. */
export declare function setNameAndRequired<T extends BuilderOption>(opt: T, option: SlashCommandOption): T;
