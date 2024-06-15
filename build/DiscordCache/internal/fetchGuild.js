import { verbose } from "@rsc-utils/core-utils";
import { resolveGuildId } from "../../resolve/resolveGuildId.js";
import { DiscordApiError } from "../../DiscordApiError.js";
export async function fetchGuild(client, guildIdResolvable) {
    const guildId = resolveGuildId(guildIdResolvable);
    if (!guildId) {
        return undefined;
    }
    const guild = await client.guilds.fetch(guildId).catch(DiscordApiError.process);
    verbose(`fetchGuild(${guildId}) = ${guild?.name}`);
    return guild;
}
