import { addOptions } from "./addOptions.js";
import { setName } from "./setName.js";
/** shortcut for setting subcommands where they are allowed */
export function addSubcommands(builder, commands) {
    commands?.forEach(command => builder.addSubcommand(sub => addOptions(setName(sub, command), command.options)));
    return builder;
}
