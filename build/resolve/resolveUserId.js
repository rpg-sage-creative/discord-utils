import { resolveSnowflake } from "./resolveSnowflake.js";
export function resolveUserId(resolvable) {
    if (resolvable) {
        if (typeof (resolvable) !== "string") {
            if ("userId" in resolvable) {
                return resolveSnowflake(resolvable.userId);
            }
            if ("user" in resolvable) {
                return resolveSnowflake(resolvable.user.id);
            }
        }
        return resolveSnowflake(resolvable);
    }
    return undefined;
}
