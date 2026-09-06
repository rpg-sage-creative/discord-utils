/** Returns the guild name or "UnknownGuild" */
export function toGuildName(guild) {
    return guild?.name ?? "UnknownGuild";
}
