import { error, formatArg, warn } from "@rsc-utils/core-utils";
const DiscordAPIErrorRegExp = /DiscordAPIError(\[\d+\])?/;
const InvalidUsernameRegExp = /Username cannot contain "(?<name>[^"]+)"/;
export function isDiscordApiError(reason, ...codes) {
    if (DiscordAPIErrorRegExp.test(String(reason?.name))) {
        if (codes.some(code => reason.code === code))
            return true;
        return isErrorCode(reason?.code) || isWarnCode(reason?.code);
    }
    return false;
}
/** Error codes that should log as an error. */
function isErrorCode(code) {
    return code === 50001 // "Missing Access"
        || code === 50035 // "Invalid Form Body"
    ;
}
/** Error codes that should log as a warning. */
function isWarnCode(code) {
    return code === 10003 // "Unknown Channel"
        || code === 10004 // "Unknown Guild"
        || code === 10007 // "Unknown Member"
        || code === 10008 // "Unknown Message"
        || code === 10011 // "Unknown Role"
        || code === 10013 // "Unknown User"
        || code === 10014 // "Unknown Emoji"
        || code === 10015 // "Unknown Webhook"
        || code === 10062 // "Unknown Interaction"
    ;
}
export class DiscordApiError {
    error;
    asString;
    constructor(error) {
        this.error = error;
        this.asString = formatArg(error);
    }
    get isAvatarUrl() { return this.asString.includes("avatar_url[URL_TYPE_INVALID_URL]"); }
    get isEmbedThumbnailUrl() { return this.asString.includes("thumbnail.url[URL_TYPE_INVALID_URL]"); }
    get isFetchWebhooks() { return this.asString.includes(".fetchWebhooks"); }
    get isUsername() { return this.asString.includes("username[USERNAME_INVALID_CONTAINS]"); }
    getInvalidUsername() { return InvalidUsernameRegExp.exec(this.asString)?.groups?.name; }
    get isMissingPermissions() { return this.asString.includes("Missing Permissions"); }
    /** Tries to process various DiscordApiErrors and returns true if logged in some way. */
    process() {
        if (this.isUsername) {
            error({ invalidUsername: this.getInvalidUsername() });
            return true;
        }
        if (isErrorCode(this.error.code)) {
            if (this.isAvatarUrl || this.isEmbedThumbnailUrl) {
                warn(`An image url (avatar or thumbnail) has been flagged as invalid.`);
            }
            else {
                error(this.error);
            }
            return true;
        }
        if (this.isFetchWebhooks && this.isMissingPermissions) {
            warn(`DiscordAPIError[${this.error.code}]: Missing Permissions (TextChannel.fetchWebhooks)`);
            return true;
        }
        if (isWarnCode(this.error.code)) {
            warn(`[${this.error.code}]${this.error.message}: ${this.error.url}`);
            return true;
        }
        return false;
    }
    /** Creates a DiscordApiError object if valid. */
    static from(reason) {
        return isDiscordApiError(reason) ? new DiscordApiError(reason) : undefined;
    }
    /** Processes DiscordApiError errors but ignores other objects. */
    static process(err) {
        DiscordApiError.from(err)?.process();
        return undefined;
    }
    /** Creates a catcher that ignores the given codes but processes other DiscordApiError objects. */
    static ignore(...codes) {
        return (reason) => {
            if (!isDiscordApiError(reason, ...codes)) {
                DiscordApiError.process(reason);
            }
        };
    }
}
