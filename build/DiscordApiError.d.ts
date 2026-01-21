import type { DiscordAPIError as TDiscordApiError } from "discord.js";
/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes */
type ErrorCode = 10003 | 10004 | 10007 | 10008 | 10011 | 10013 | 10014 | 10015 | 10062 | 50001 | 50035;
/** Tests the given object to see if it is a valid DiscordApiError object. */
export declare function isDiscordApiError(reason: unknown): reason is TDiscordApiError;
export declare function isDiscordApiError<T extends ErrorCode>(reason: unknown, codes: T): reason is (TDiscordApiError & {
    code: T;
});
export declare function isDiscordApiError<T extends ErrorCode>(reason: unknown, ...codes: T[]): reason is TDiscordApiError;
export declare class DiscordApiError {
    error: TDiscordApiError;
    protected asString: string;
    protected constructor(error: TDiscordApiError);
    get isAvatarUrl(): boolean;
    get isEmbedThumbnailUrl(): boolean;
    get isFetchWebhooks(): boolean;
    get isUsername(): boolean;
    getInvalidUsername(): string | undefined;
    get isMissingPermissions(): boolean;
    /** Tries to process various DiscordApiErrors and returns true if logged in some way. */
    process(): boolean;
    /** Creates a DiscordApiError object if valid. */
    static from(reason: unknown): DiscordApiError | undefined;
    /** Processes DiscordApiError errors but ignores other objects. */
    static process(err: unknown): undefined;
    /** Creates a catcher that ignores the given codes but processes other DiscordApiError objects. */
    static ignore<T extends ErrorCode>(...codes: T[]): (reason: unknown) => undefined;
}
export {};
