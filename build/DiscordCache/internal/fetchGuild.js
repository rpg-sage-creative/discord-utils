import { verbose } from "@rsc-utils/core-utils";
import { resolveGuildId } from "../../resolve/resolveGuildId.js";
import { DiscordApiError } from "../../DiscordApiError.js";
export async function fetchGuild(client, guildIdResolvable) {
    const guildId = resolveGuildId(guildIdResolvable);
    if (!guildId) {
        return undefined;
    }
    verbose(`fetchGuild(${guildId})`);
    return client.guilds.fetch(guildId).catch(DiscordApiError.process);
}
