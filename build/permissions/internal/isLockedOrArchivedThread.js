import { isThreadChannel } from "../../types/typeGuards/isThreadChannel.js";
export function isLockedOrArchivedThread(channel) {
    if (isThreadChannel(channel)) {
        if (channel.locked) {
            return true;
        }
        if (channel.archived && !channel.unarchivable) {
            return true;
        }
    }
    return false;
}
