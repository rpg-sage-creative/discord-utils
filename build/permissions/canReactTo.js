import { getPermsFor } from "./getPermsFor.js";
import { isLockedOrArchivedThread } from "./internal/isLockedOrArchivedThread.js";
export function canReactTo(botId, channel) {
    if (!channel) {
        return false;
    }
    if (channel.isDMBased()) {
        return true;
    }
    if (isLockedOrArchivedThread(channel)) {
        return false;
    }
    const perms = getPermsFor(channel, botId);
    return perms.can("AddReactions");
}
