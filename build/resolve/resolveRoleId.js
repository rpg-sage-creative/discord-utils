import {} from "@rsc-utils/core-utils";
import { resolveSnowflake } from "./resolveSnowflake.js";
export function resolveRoleId(resolvable) {
    if (resolvable) {
        return resolveSnowflake(resolvable);
    }
    return undefined;
}
