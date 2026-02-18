type CommandPathValidator = (commandPath: string) => boolean;
type UpdateArgs = {
    appId: string;
    appToken: string;
    codeName: string;
    commandPathValidator: CommandPathValidator;
};
export declare function updateSlashCommands({ appId, appToken, codeName, commandPathValidator }: UpdateArgs): Promise<void>;
export {};
