import { resolveSnowflake } from "./resolveSnowflake.js";
export function resolveGuildId(resolvable) {
    if (resolvable) {
        if (typeof (resolvable) !== "string" && "guild" in resolvable) {
            return resolveSnowflake(resolvable.guild?.id);
        }
        return resolveSnowflake(resolvable);
    }
    return undefined;
}
