import { error, formatArg, warn } from "@rsc-utils/core-utils";
import { toHumanReadable } from "./humanReadable/toHumanReadable.js";
export function isDiscordApiError(reason) {
    return reason?.name === "DiscordAPIError"
        || isErrorCode(reason?.code)
        || isWarnCode(reason?.code);
}
function isErrorCode(code) {
    return code === 50035;
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
    get isFetchWebhooks() { return this.asString.includes(".fetchWebhooks"); }
    get isMissingPermissions() { return this.asString.includes("Missing Permissions"); }
    process() {
        if (isErrorCode(this.error.code)) {
            error(this.error);
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
    static process(err, options) {
        const processed = DiscordApiError.from(err)?.process() ?? false;
        if (!processed) {
            if (options?.target || options?.errMsg) {
                error([toHumanReadable(options.target), options.errMsg].filter(o => o).join(": "));
            }
            else {
                error(err);
            }
        }
        return options?.retVal;
    }
}
