import { getPermsFor } from "./getPermsFor.js";
import { isLockedOrArchivedThread } from "./internal/isLockedOrArchivedThread.js";
export function canSendMessageTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (channel.isDMBased()) {
        return true;
    }
    if (isLockedOrArchivedThread(channel) && !channel.sendable) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.can("SendTo");
}
