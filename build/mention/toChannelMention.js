import {} from "@rsc-utils/core-utils";
import { channelMention } from "discord.js";
import { resolveSnowflake } from "../resolveSnowflake.js";
export function toChannelMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? channelMention(id) : undefined;
}
