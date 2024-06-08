import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { roleMention } from "discord.js";

export function toRoleMention(id: Optional<Snowflake>): string | null {
	return id ? roleMention(id) : null;
}