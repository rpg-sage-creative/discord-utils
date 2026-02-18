import { error } from "@rsc-utils/core-utils";
import { filterFiles } from "@rsc-utils/io-utils";
import { join, parse } from "node:path";
export async function registerCommands(commandPathValidator) {
    const commands = { message: [], slash: [], user: [] };
    const pathRoot = process.argv.find(arg => arg.startsWith("pathRoot=/"))?.slice(9)
        ?? join(parse(process.argv[1]).dir, "commands");
    const filterFileOptions = {
        dirFilter: (_dirName, dirPath) => commandPathValidator(dirPath),
        fileFilter: (fileName) => fileName.endsWith(".js") && fileName !== "registerCommands.js",
        recursive: true
    };
    try {
        const commandPaths = await filterFiles(pathRoot, filterFileOptions);
        for (const commandPath of commandPaths) {
            const { registerCommand } = await import(commandPath);
            let commandArray = commands.slash;
            if (commandPath.includes("/message/")) {
                commandArray = commands.message;
            }
            else if (commandPath.includes("/user/")) {
                commandArray = commands.user;
            }
            commandArray.push(registerCommand());
        }
    }
    catch (ex) {
        error(ex);
    }
    return commands;
}
