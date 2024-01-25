import { type NIL_SNOWFLAKE, type Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/type-utils";
import type { DInteraction, DMessage, DMessageChannel, DReaction } from "./types.js";
import { MessageReference } from "discord.js";
interface IHasSnowflakeId {
    id: Snowflake;
}
type TSnowflakeResolvable = string | IHasSnowflakeId;
export declare class DiscordKey {
    server: Snowflake;
    channel: Snowflake;
    thread: Snowflake;
    message: Snowflake;
    isDm: boolean;
    isEmpty: boolean;
    isValid: boolean;
    key: string;
    shortKey: string;
    hasServer: boolean;
    hasChannel: boolean;
    hasThread: boolean;
    hasMessage: boolean;
    constructor(server: Optional<TSnowflakeResolvable>, channel: Optional<TSnowflakeResolvable>, thread?: Optional<TSnowflakeResolvable>, message?: Optional<TSnowflakeResolvable>);
    /** Returns the thread if it has one. Returns the channel otherwise. */
    get threadOrChannel(): Snowflake;
    get channelAndThread(): {
        channel: Snowflake | null;
        thread: Snowflake | null;
    };
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
    static toMessageUrl(msgOrRef: DMessage | MessageReference): string;
}
export {};
