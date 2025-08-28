import { error, formatArg, warn } from "@rsc-utils/core-utils";
export function isDiscordApiError(reason, ...codes) {
    if (/DiscordAPIError(\[\d+\])?/.test(String(reason?.name))) {
        if (codes.some(code => reason.code === code))
            return true;
        return isErrorCode(reason?.code) || isWarnCode(reason?.code);
    }
    return false;
}
function isErrorCode(code) {
    return code === 50001
        || code === 50035;
}
function isWarnCode(code) {
    return code === 10003
        || code === 10004
        || code === 10007
        || code === 10008
        || code === 10011
        || code === 10013
        || code === 10014
        || code === 10015
        || code === 10062;
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
    getInvalidUsername() { return /Username cannot contain "(?<name>[^"]+)"/.exec(this.asString)?.groups?.name; }
    get isMissingPermissions() { return this.asString.includes("Missing Permissions"); }
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
    static from(reason) {
        return isDiscordApiError(reason) ? new DiscordApiError(reason) : undefined;
    }
    static process(err) {
        DiscordApiError.from(err)?.process();
        return undefined;
    }
    static ignore(...codes) {
        return (reason) => {
            if (!isDiscordApiError(reason, ...codes)) {
                DiscordApiError.process(reason);
            }
        };
    }
}
