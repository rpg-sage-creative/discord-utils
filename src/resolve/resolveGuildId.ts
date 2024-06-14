import type { Optional, OrUndefined } from "@rsc-utils/core-utils";
import type { GuildResolvable, Snowflake } from "discord.js";

/** Resolves to Snowflake. */
export function resolveGuildId(resolvable: GuildResolvable): Snowflake;

/** Resolves to Snowflake or undefined. */
export function resolveGuildId(resolvable: Optional<GuildResolvable>): OrUndefined<Snowflake>;

export function resolveGuildId(resolvable: Optional<GuildResolvable>): OrUndefined<Snowflake> {
	if (resolvable) {
		if (typeof(resolvable) === "string") {
			return resolvable;
		}
		if ("guild" in resolvable) {
			return resolvable.guild?.id;
		}
		return resolvable.id;
	}
	return undefined;
}