import type { Optional } from "@rsc-utils/core-utils";
import { GuildMember, User } from "discord.js";
import { type SnowflakeResolvable } from "../resolve/resolveSnowflake.js";
export declare function toUserMention(resolvable: Optional<SnowflakeResolvable | GuildMember | User>): string | undefined;
