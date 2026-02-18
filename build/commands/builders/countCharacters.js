import { registerCommands } from "../registerCommands.js";
function doCount(cmd) {
    let count = 0;
    count += cmd.name.length;
    count += cmd.description?.length ?? 0;
    cmd.children?.forEach(child => count += doCount(child));
    cmd.options?.forEach(option => count += doCount(option));
    return count;
}
export async function countCharacters(commandPathValidator) {
    let count = 0;
    const commands = await registerCommands(commandPathValidator);
    const keys = Object.keys(commands);
    keys.forEach(type => {
        commands[type].forEach(command => {
            count += doCount(command);
        });
    });
    return count;
}
