import {} from "@rsc-utils/core-utils";
import { roleMention } from "discord.js";
import { resolveSnowflake } from "../resolveSnowflake.js";
export function toRoleMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? roleMention(id) : undefined;
}
