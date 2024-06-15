import { resolveSnowflake } from "./resolveSnowflake.js";
export function resolveChannelId(resolvable) {
    if (resolvable) {
        if (typeof (resolvable) !== "string" && "channelId" in resolvable) {
            return resolveSnowflake(resolvable.channelId);
        }
        return resolveSnowflake(resolvable);
    }
    return undefined;
}
