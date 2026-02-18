import type { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } from "@discordjs/builders";
import type { SlashCommand } from "../index.js";
/** shortcut for setting subcommands where they are allowed */
export declare function addSubcommands<T extends SlashCommandBuilder | SlashCommandSubcommandGroupBuilder>(builder: T, commands?: SlashCommand[]): T;
