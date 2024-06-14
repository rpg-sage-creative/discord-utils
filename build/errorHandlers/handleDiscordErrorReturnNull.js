import { error, formatArg, warn } from "@rsc-utils/core-utils";
import { toHumanReadable } from "../humanReadable/toHumanReadable.js";
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
        && asString.includes(".fetchWebhooks");
}
function handleDiscordApiError(reason) {
    if (isDiscordApiError(reason)) {
        if (isDiscordApiErrorMissingPermissionsFetchWebhook(reason)) {
            warn(`DiscordAPIError: Missing Permissions (TextChannel.fetchWebhooks)`);
            return true;
        }
        if (/Unknown (Guild|Member|User)/.test(reason?.message ?? "")) {
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
