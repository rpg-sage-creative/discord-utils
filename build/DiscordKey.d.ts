import { type NIL_SNOWFLAKE, type Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/core-utils";
import type { MessageReference } from "discord.js";
import type { DInteraction, DMessage, DMessageChannel, DReaction } from "./types.js";
interface IHasSnowflakeId {
    id: Snowflake;
}
type TSnowflakeResolvable = string | IHasSnowflakeId;
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
    constructor(server: Optional<TSnowflakeResolvable>, channel: Optional<TSnowflakeResolvable>, 
    /** @deprecated */
    thread?: Optional<TSnowflakeResolvable>, message?: Optional<TSnowflakeResolvable>);
    /** @deprecated Returns the thread if it has one. Returns the channel otherwise. */
    get threadOrChannel(): Snowflake;
    /** @deprecated */
    get channelAndThread(): {
        channel: Snowflake | null;
        thread: Snowflake | null;
    };
    /** @deprecated */
    get user(): Snowflake | null;
    toString(): string;
    toChannelUrl(): string;
    toMessageUrl(): string | null;
    toUrl(): string;
    static createKey(...resolvables: Optional<TSnowflakeResolvable>[]): string;
    static fromChannel(channel: DMessageChannel): DiscordKey;
    static fromInteraction(interaction: DInteraction): DiscordKey;
    static fromMessage(message: DMessage): DiscordKey;
    static fromMessageReaction(messageReaction: DReaction): DiscordKey;
    /** Resolves to a nonNilSnowflake or NIL_SNOWFLAKE. */
    static resolveId(resolvable: Optional<TSnowflakeResolvable>): Snowflake | NIL_SNOWFLAKE;
    static fromUrl(url: string): DiscordKey | null;
}
export {};
