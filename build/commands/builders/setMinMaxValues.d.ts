import type { SlashCommandIntegerOption, SlashCommandNumberOption } from "@discordjs/builders";
import type { SlashCommandOption } from "../index.js";
export declare function setMinMaxValues<T extends SlashCommandIntegerOption | SlashCommandNumberOption>(opt: T, option: SlashCommandOption): T;
