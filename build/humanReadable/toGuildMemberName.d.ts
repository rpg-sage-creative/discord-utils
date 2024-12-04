import { type Optional } from "@rsc-utils/core-utils";
import type { GuildMember } from "discord.js";
/** Returns the guild member as a readable mention or "@UnknownGuildMember" */
export declare function toGuildMemberName(member: Optional<GuildMember>): string;
