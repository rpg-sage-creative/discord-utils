import { GuildMember, User, userMention } from "discord.js";
import { resolveSnowflake } from "../resolve/resolveSnowflake.js";
export function toUserMention(resolvable) {
    const id = resolveSnowflake(resolvable);
    return id ? userMention(id) : undefined;
}
