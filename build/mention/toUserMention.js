import {} from "@rsc-utils/core-utils";
import { userMention } from "discord.js";
import { resolveSnowflake } from "../resolveSnowflake.js";
export function toUserMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? userMention(id) : undefined;
}
