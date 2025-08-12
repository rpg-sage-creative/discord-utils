import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { DiscordKey } from "../DiscordKey.js";
import type { GameChannel, MessageOrPartial } from "../types/index.js";

export type ChannelReference = { guildId?:Snowflake; channelId:Snowflake; }

export type ChannelReferenceResolvable = GameChannel | MessageOrPartial | ChannelReference;

export type CanBeChannelReferenceResolvable = ChannelReferenceResolvable | DiscordKey; //NOSONAR

/** Resolves to Snowflake. */
export function resolveChannelReference(resolvable: ChannelReferenceResolvable): ChannelReference;

/** Resolves to Snowflake or undefined. */
export function resolveChannelReference(resolvable: Optional<CanBeChannelReferenceResolvable>): OrUndefined<ChannelReference>;

export function resolveChannelReference(resolvable: Optional<CanBeChannelReferenceResolvable>): OrUndefined<ChannelReference> {
	if (resolvable) {
		let guildId: Optional<string>;
		let channelId: Optional<string>;
		if ("channelId" in resolvable) {
			({ guildId, channelId } = resolvable);
		}else {
			guildId = "guildId" in resolvable ? resolvable.guildId : undefined;
			channelId = resolvable.id;
		}
		if (channelId) {
			return { guildId, channelId } as ChannelReference;
		}
	}
	return undefined;
}