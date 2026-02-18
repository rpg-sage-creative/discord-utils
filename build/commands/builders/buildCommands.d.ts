import type { ContextMenuCommandBuilder, SlashCommandBuilder } from "@discordjs/builders";
type BuilderType = SlashCommandBuilder | ContextMenuCommandBuilder;
type CommandPathValidator = (commandPath: string) => boolean;
export declare function buildCommands(commandPathValidator: CommandPathValidator): Promise<BuilderType[]>;
export {};
