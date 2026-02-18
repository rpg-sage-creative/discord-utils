import type { BuilderCommand, SlashCommandOption } from "../index.js";
/** shortcut for setting options all things that allow options */
export declare function addOptions<T extends BuilderCommand>(builder: T, options?: SlashCommandOption[]): T;
