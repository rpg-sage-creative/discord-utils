import { type Optional, type Snowflake } from "@rsc-utils/core-utils";
import type { Interaction, MessageReference } from "discord.js";
import type { ChannelReference } from "./resolve/resolveChannelReference.js";
import { type CanBeSnowflakeResolvable, type SnowflakeResolvable } from "./resolve/resolveSnowflake.js";
import type { MessageOrPartial, MessageReferenceOrPartial, MessageTarget, ReactionOrPartial } from "./types/index.js";
export declare class DiscordKey implements MessageReference, ChannelReference {
    get guildId(): Snowflake | undefined;
    get channelId(): Snowflake;
    get messageId(): Snowflake | undefined;
    get type(): number;
    get userId(): Snowflake | undefined;
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
    static from(resolvable: MessageTarget | Interaction | MessageOrPartial | ReactionOrPartial | MessageReferenceOrPartial): DiscordKey;
    static fromUrl(url: string): DiscordKey | undefined;
}
