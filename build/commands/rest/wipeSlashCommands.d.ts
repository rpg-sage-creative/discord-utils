type WipeArgs = {
    appId: string;
    appToken: string;
    codeName: string;
};
export declare function wipeSlashCommands({ appId, appToken, codeName }: WipeArgs): Promise<void>;
export {};
