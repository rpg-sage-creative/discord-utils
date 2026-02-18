import { registerCommands } from "../registerCommands.js";
import { buildContext } from "./buildContext.js";
import { buildSlash } from "./buildSlash.js";
export async function buildCommands(commandPathValidator) {
    const builders = [];
    const commands = await registerCommands(commandPathValidator);
    builders.push(...buildSlash(commands.slash));
    builders.push(...buildContext(commands.message));
    builders.push(...buildContext(commands.user));
    return builders;
}
