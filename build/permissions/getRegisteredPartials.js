import { Partials } from "discord.js";
export function getRegisteredPartials() {
    return [
        // Partials.Channel,
        // Partials.GuildMember,         // guild member updates
        // Partials.GuildScheduledEvent, //
        Partials.Message, // message update, reaction add/remove
        Partials.Reaction, // reaction add/remove
        // Partials.SoundboardSound,     //
        Partials.ThreadMember, //
        // Partials.User,                // reaction add/remove
    ];
}
