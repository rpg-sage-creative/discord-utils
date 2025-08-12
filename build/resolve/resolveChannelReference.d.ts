import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { DiscordKey } from "../DiscordKey.js";
import type { GameChannel, MessageOrPartial } from "../types/index.js";
export type ChannelReference = {
    guildId?: Snowflake;
    channelId: Snowflake;
};
export type ChannelReferenceResolvable = GameChannel | MessageOrPartial | ChannelReference;
export type CanBeChannelReferenceResolvable = ChannelReferenceResolvable | DiscordKey;
/** Resolves to Snowflake. */
export declare function resolveChannelReference(resolvable: ChannelReferenceResolvable): ChannelReference;
/** Resolves to Snowflake or undefined. */
export declare function resolveChannelReference(resolvable: Optional<CanBeChannelReferenceResolvable>): OrUndefined<ChannelReference>;
