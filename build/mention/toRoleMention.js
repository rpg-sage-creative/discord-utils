import { Formatters } from "discord.js";
export function toRoleMention(id) {
    return id ? Formatters.roleMention(id) : null;
}
