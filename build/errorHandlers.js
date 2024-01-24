import { error, warn } from "@rsc-utils/console-utils";
import { toHumanReadable } from "./toHumanReadable";
function isInvalidFormBodyError(reason) {
    return reason.code === 50035;
}
function handleInvalidFormBodyError(reason) {
    if (isInvalidFormBodyError(reason)) {
        const stringValue = Object.prototype.toString.call(reason);
        error(stringValue);
        return true;
    }
    return false;
}
function isDiscordApiError(reason) {
    return reason?.name === "DiscordAPIError";
}
function isDiscordApiErrorMissingPermissionsFetchWebhook(_reason, asString) {
    return asString.includes("DiscordAPIError: Missing Permissions")
        && asString.includes("TextChannel.fetchWebhooks");
}
function isUnknownGuild(reason) {
    return reason?.message === "Unknown Guild";
}
function isUnknownMember(reason) {
    return reason?.message === "Unknown Member";
}
function isUnknownUser(reason) {
    return reason?.message === "Unknown User";
}
function handleDiscordApiError(reason) {
    if (isDiscordApiError(reason)) {
        const asString = Object.prototype.toString.call(reason);
        if (isDiscordApiErrorMissingPermissionsFetchWebhook(reason, asString)) {
            warn(`DiscordAPIError: Missing Permissions (TextChannel.fetchWebhooks)`);
            return true;
        }
        if (isUnknownMember(reason) || isUnknownGuild(reason) || isUnknownUser(reason)) {
            warn(`${reason.message}: ${reason.path}`);
            return true;
        }
    }
    return false;
}
export function handleDiscordErrorReturnNull(reason, options) {
    let handled = false;
    handled ||= handleInvalidFormBodyError(reason);
    handled ||= handleDiscordApiError(reason);
    if (!handled) {
        const output = (options?.target || options?.errMsg)
            ? [toHumanReadable(options.target), options.errMsg].filter(s => s).join(": ")
            : Object.prototype.toString.call(reason);
        if (output === "[object Error]") {
            error(reason);
        }
        else {
            error(output);
        }
    }
    return null;
}
