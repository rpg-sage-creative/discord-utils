import type { ContextMenuCommandBuilder, SlashCommandBuilder } from "@discordjs/builders";
type BuilderType = SlashCommandBuilder | ContextMenuCommandBuilder;
type CommandPathValidator = (commandPath: string) => boolean;
export declare function buildAndCount(commandPathValidator: CommandPathValidator): Promise<{
    builders: BuilderType[];
    characterCount: number;
}>;
export {};
