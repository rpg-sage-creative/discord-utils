import { ComponentType } from "discord.js";
export function getActionRows(message) {
    return message?.components.filter(tlc => tlc.type === ComponentType.ActionRow) ?? [];
}
