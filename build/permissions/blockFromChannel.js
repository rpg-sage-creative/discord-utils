import { error } from "@rsc-utils/core-utils";
import { getPermsFor } from "./getPermsFor.js";
/** Blocks the given target from the given channel. */
export async function blockFromChannel(sage, channel, memberToBlock) {
    const perms = getPermsFor(channel, sage);
    // see if we can manage the channel
    const canManageChannel = perms.can("ManageChannels");
    const canViewChannel = perms.can("ViewChannel");
    // check the state before we do any work
    const blockedBefore = !getPermsFor(channel, memberToBlock).can("ViewChannel");
    // if we can't manage or we don't need to, return now
    if (!canManageChannel || !canViewChannel || blockedBefore) {
        return { canManageChannel, canViewChannel, blockCorrect: blockedBefore };
    }
    // prepare perms
    const overwrites = { "ViewChannel": false };
    // update perms
    let fixError = false;
    const errorHandler = (log) => {
        if (log) {
            const fnName = "blockFromChannel";
            const fnSection = "permissionOverwrites";
            const channelType = channel.type;
            const parentChannelType = channel.parent?.type;
            error({ fnName, fnSection, channelType, parentChannelType });
        }
        fixError = true;
        return null;
    };
    const updatedChannel = "permissionOverwrites" in channel
        ? await channel.permissionOverwrites.create(memberToBlock, overwrites).catch(() => errorHandler(false))
        : errorHandler(true);
    // recheck perms
    const blockedAfter = !getPermsFor(updatedChannel ?? channel, memberToBlock).can("ViewChannel");
    return {
        canManageChannel,
        canViewChannel,
        blockedBefore,
        fixAttempted: true,
        fixSuccess: !fixError,
        blockedAfter,
        blockCorrect: blockedAfter
    };
}
