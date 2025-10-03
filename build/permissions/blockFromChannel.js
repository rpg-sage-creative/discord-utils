import { error } from "@rsc-utils/core-utils";
import { getPermsFor } from "./getPermsFor.js";
export async function blockFromChannel(sage, channel, memberToBlock) {
    const perms = getPermsFor(channel, sage);
    const canManageChannel = perms.can("ManageChannels");
    const canViewChannel = perms.can("ViewChannel");
    const blockedBefore = !getPermsFor(channel, memberToBlock).can("ViewChannel");
    if (!canManageChannel || !canViewChannel || blockedBefore) {
        return { canManageChannel, canViewChannel, blockCorrect: blockedBefore };
    }
    const overwrites = { "ViewChannel": false };
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
