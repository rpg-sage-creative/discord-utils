import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { userMention } from "discord.js";

export function toUserMention(id: Optional<Snowflake>): string | null {
	return id ? userMention(id) : null;
}