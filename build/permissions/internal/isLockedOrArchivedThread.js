import { isThreadGameChannel } from "../../types/typeGuards/isThreadGameChannel.js";
export function isLockedOrArchivedThread(channel) {
    if (isThreadGameChannel(channel)) {
        if (channel.locked) {
            return true;
        }
        if (channel.archived && !channel.unarchivable) {
            return true;
        }
    }
    return false;
}
