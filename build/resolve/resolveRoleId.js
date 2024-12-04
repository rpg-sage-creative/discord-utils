import { resolveSnowflake } from "./resolveSnowflake.js";
export function resolveRoleId(resolvable) {
    if (resolvable) {
        return resolveSnowflake(resolvable);
    }
    return undefined;
}
