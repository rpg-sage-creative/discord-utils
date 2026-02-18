import type { MessageCommand, SlashCommand, UserCommand } from "../index.js";
type Commands = {
    message: MessageCommand[];
    slash: SlashCommand[];
    user: UserCommand[];
};
type CommandPathValidator = (commandPath: string) => boolean;
export declare function registerCommands(commandPathValidator: CommandPathValidator): Promise<Commands>;
export {};
