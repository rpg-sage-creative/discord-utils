import type { DiscordAPIError as TDiscordApiError } from "discord.js";
import { type Readable } from "./humanReadable/toHumanReadable.js";
/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
type ErrorCode = 10003 | 10004 | 10007 | 10008 | 10011 | 10013 | 10014 | 10015 | 10062 | 50035;
export declare function isDiscordApiError(reason: unknown): reason is TDiscordApiError;
export declare function isDiscordApiError<T extends ErrorCode>(reason: unknown, code: T): reason is (TDiscordApiError & {
    code: T;
});
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
export {};
