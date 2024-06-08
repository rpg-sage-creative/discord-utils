import {} from "@rsc-utils/core-utils";
import {} from "discord.js";
import { isDMBased, isThread } from "../typeChecks.js";
import { getPermsFor } from "./getPermsFor.js";
function isLockedOrArchivedThread(channel) {
    if (isThread(channel)) {
        if (channel.locked) {
            return true;
        }
        if (channel.archived && !channel.unarchivable) {
            return true;
        }
    }
    return false;
}
export function canSendMessageTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (isDMBased(channel)) {
        return true;
    }
    if (isLockedOrArchivedThread(channel)) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.canSendMessages;
}
export function canReactTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (isDMBased(channel)) {
        return true;
    }
    if (isLockedOrArchivedThread(channel)) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.canAddReactions;
}
export function canWebhookTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (isDMBased(channel)) {
        return false;
    }
    if (isLockedOrArchivedThread(channel)) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.canSendWebhooks;
}
