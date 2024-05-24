import type { Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/core-utils";
import { Formatters } from "discord.js";

export function toChannelMention(id: Optional<Snowflake>): string | null {
	return id ? Formatters.channelMention(id) : null;
}