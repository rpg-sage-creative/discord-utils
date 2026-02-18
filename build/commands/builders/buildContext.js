import { ContextMenuCommandBuilder } from "@discordjs/builders";
export function buildContext(all) {
    return all.map(cmd => new ContextMenuCommandBuilder()
        .setType(cmd.type)
        .setName(cmd.name));
}
