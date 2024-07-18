import type { Optional, OrUndefined, Snowflake } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { DiscordKey } from "../DiscordKey.js";
import type { MessageOrPartial } from "../types/types.js";
export type ChannelReference = {
    guildId?: Snowflake;
    channelId: Snowflake;
};
export type ChannelReferenceResolvable = Channel | MessageOrPartial | ChannelReference;
export type CanBeChannelReferenceResolvable = ChannelReferenceResolvable | DiscordKey;
/** Resolves to Snowflake. */
export declare function resolveChannelReference(resolvable: ChannelReferenceResolvable): ChannelReference;
/** Resolves to Snowflake or undefined. */
export declare function resolveChannelReference(resolvable: Optional<CanBeChannelReferenceResolvable>): OrUndefined<ChannelReference>;
