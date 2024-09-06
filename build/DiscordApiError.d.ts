import type { DiscordAPIError as TDiscordApiError } from "discord.js";
import { type Readable } from "./humanReadable/toHumanReadable.js";
/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
export declare function isDiscordApiError(reason: unknown): reason is TDiscordApiError;
export declare class DiscordApiError {
    error: TDiscordApiError;
    protected asString: string;
    protected constructor(error: TDiscordApiError);
    get isAvatarUrl(): boolean;
    get isEmbedThumbnailUrl(): boolean;
    get isFetchWebhooks(): boolean;
    get isMissingPermissions(): boolean;
    /** Tries to process various DiscordApiErrors and returns true if logged in some way. */
    process(): boolean;
    static from(reason: unknown): DiscordApiError | undefined;
    static process<T extends any = undefined>(err: unknown, options?: {
        errMsg?: unknown;
        target?: Readable;
        retVal?: T;
    }): T;
}
