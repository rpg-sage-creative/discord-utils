import { type NIL_SNOWFLAKE, type Optional, type Snowflake } from "@rsc-utils/core-utils";
import { type MessageReference } from "discord.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolve/resolveSnowflake.js";
import { type DInteraction, type MessageOrPartial, type MessageTarget, type ReactionOrPartial } from "./types/types.js";
export declare class DiscordKey implements MessageReference {
    get guildId(): Snowflake | undefined;
    get channelId(): Snowflake;
    get messageId(): Snowflake | undefined;
    server: Snowflake;
    channel: Snowflake;
    /** @deprecated */
    thread: Snowflake;
    message: Snowflake;
    isDm: boolean;
    isEmpty: boolean;
    isValid: boolean;
    key: string;
    shortKey: string;
    hasServer: boolean;
    hasChannel: boolean;
    /** @deprecated */
    hasThread: boolean;
    hasMessage: boolean;
    constructor(server: Optional<CanBeSnowflakeResolvable>, channel: Optional<CanBeSnowflakeResolvable>, 
    /** @deprecated */
    thread?: Optional<CanBeSnowflakeResolvable>, message?: Optional<CanBeSnowflakeResolvable>);
    /** @deprecated Returns the thread if it has one. Returns the channel otherwise. */
    get threadOrChannel(): Snowflake;
    /** @deprecated */
    get channelAndThread(): {
        channel: Snowflake | undefined;
        thread: Snowflake | undefined;
    };
    /** @deprecated */
    get user(): Snowflake | undefined;
    toString(): string;
    toChannelUrl(): string;
    toMessageUrl(): string | undefined;
    toUrl(): string;
    static createKey(...resolvables: Optional<SnowflakeResolvable>[]): string;
    static fromChannel(channel: MessageTarget): DiscordKey;
    static fromInteraction(interaction: DInteraction): DiscordKey;
    static fromMessage(message: MessageOrPartial): DiscordKey;
    static fromMessageReaction(messageReaction: ReactionOrPartial): DiscordKey;
    /** Resolves to a nonNilSnowflake or NIL_SNOWFLAKE. */
    static resolveId(resolvable: Optional<CanBeSnowflakeResolvable>): Snowflake | NIL_SNOWFLAKE;
    static fromUrl(url: string): DiscordKey | undefined;
}
