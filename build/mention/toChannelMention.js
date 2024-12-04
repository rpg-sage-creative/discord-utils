import { channelMention } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
export function toChannelMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? channelMention(id) : undefined;
}
