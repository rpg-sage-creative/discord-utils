import { roleMention } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
export function toRoleMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? roleMention(id) : undefined;
}
