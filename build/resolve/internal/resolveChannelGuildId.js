import { resolveGuildId } from "../resolveGuildId.js";
export function resolveChannelGuildId(resolvable) {
    if (resolvable && typeof (resolvable) !== "string" && "guildId" in resolvable) {
        return resolveGuildId(resolvable.guildId);
    }
    return undefined;
}
