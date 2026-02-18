import { SlashCommandBuilder } from "@discordjs/builders";
import { getCodeName } from "@rsc-utils/core-utils";
import { addOptions } from "./addOptions.js";
import { addSubcommands } from "./addSubCommands.js";
import { setName } from "./setName.js";
function buildOne(raw) {
    const which = getCodeName();
    raw.name = which.includes("stable") ? `sage-${raw.name}` : `sage-${which}-${raw.name}`;
    const cmd = setName(new SlashCommandBuilder(), raw);
    raw.children?.forEach(child => {
        if (child.children?.length) {
            cmd.addSubcommandGroup(grp => addSubcommands(setName(grp, child), child.children));
        }
        else {
            cmd.addSubcommand(sub => addOptions(setName(sub, child), child.options));
        }
    });
    addOptions(cmd, raw.options);
    return cmd;
}
export function buildSlash(all) {
    const builders = [];
    const games = new Map();
    all.forEach(cmd => {
        if (cmd.game) {
            if (!games.has(cmd.game)) {
                games.set(cmd.game, []);
            }
            games.get(cmd.game)?.push(cmd);
        }
        else {
            builders.push(buildOne(cmd));
        }
    });
    for (const [game, cmds] of games) {
        builders.push(buildOne({ name: game, children: cmds }));
    }
    return builders;
}
