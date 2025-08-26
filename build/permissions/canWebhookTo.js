import { getPermsFor } from "./getPermsFor.js";
import { isLockedOrArchivedThread } from "./internal/isLockedOrArchivedThread.js";
export function canWebhookTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (channel.isDMBased()) {
        return false;
    }
    if (isLockedOrArchivedThread(channel)) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.canSendWebhooks;
}
