import { Partials } from "discord.js";
export function getRegisteredPartials() {
    return [
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
    ];
}
