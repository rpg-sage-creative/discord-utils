import { error, formatArg, warn } from "@rsc-utils/core-utils";
import { toHumanReadable } from "./humanReadable/toHumanReadable.js";
export function isDiscordApiError(reason) {
    return reason?.name === "DiscordAPIError";
}
export class DiscordApiError {
    error;
    asString;
    constructor(error) {
        this.error = error;
        this.asString = formatArg(error);
    }
    get isFetchWebhooks() { return this.asString.includes(".fetchWebhooks"); }
    get isInvalidFormBody() { return this.error.code === 50035; }
    get isMissingPermissions() { return this.asString.includes("Missing Permissions"); }
    get isUnknownGuild() { return this.error?.message === "Unknown Guild"; }
    get isUnknownMember() { return this.error?.message === "Unknown Member"; }
    get isUnknownUser() { return this.error?.message === "Unknown User"; }
    process() {
        if (this.isInvalidFormBody) {
            error(this.error);
            return true;
        }
        if (this.isFetchWebhooks && this.isMissingPermissions) {
            warn(`DiscordAPIError: Missing Permissions (TextChannel.fetchWebhooks)`);
            return true;
        }
        if (this.isUnknownGuild || this.isUnknownMember || this.isUnknownUser) {
            warn(`${this.error.message}: ${this.error.url}`);
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
