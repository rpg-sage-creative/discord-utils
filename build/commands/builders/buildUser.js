import { ContextMenuCommandBuilder } from "@discordjs/builders";
export function buildUser(all) {
    return all.map(cmd => new ContextMenuCommandBuilder()
        .setType(cmd.type)
        .setName(cmd.name));
}
