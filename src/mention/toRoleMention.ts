import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { roleMention } from "discord.js";

export function toRoleMention(id: Optional<Snowflake>): string | undefined {
	return id ? roleMention(id) : undefined;
}