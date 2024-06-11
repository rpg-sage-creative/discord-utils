import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { channelMention } from "discord.js";

export function toChannelMention(id: Optional<Snowflake>): string | undefined {
	return id ? channelMention(id) : undefined;
}