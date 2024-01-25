import { Formatters } from "discord.js";
export function toUserMention(id) {
    return id ? Formatters.userMention(id) : null;
}
