export function isLockedOrArchivedThread(channel) {
    if (channel.isThread()) {
        if (channel.locked) {
            return true;
        }
        if (channel.archived && !channel.unarchivable) {
            return true;
        }
    }
    return false;
}
