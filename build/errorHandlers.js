import { error, warn, formatArg } from "@rsc-utils/core-utils";
import { toHumanReadable } from "./toHumanReadable.js";
function isInvalidFormBodyError(reason) {
    return reason.code === 50035;
}
function handleInvalidFormBodyError(reason) {
    if (isInvalidFormBodyError(reason)) {
        error(reason);
        return true;
    }
    return false;
}
function isDiscordApiError(reason) {
    return reason?.name === "DiscordAPIError";
}
function isDiscordApiErrorMissingPermissionsFetchWebhook(reason) {
    const asString = formatArg(reason);
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
        if (isDiscordApiErrorMissingPermissionsFetchWebhook(reason)) {
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
        if (options?.target || options?.errMsg) {
            error([toHumanReadable(options.target), options.errMsg].filter(s => s).join(": "));
        }
        else {
            error(reason);
        }
    }
    return null;
}
