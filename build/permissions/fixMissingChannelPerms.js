import { error } from "@rsc-utils/core-utils";
import { getPermsFor } from "./getPermsFor.js";
import { getRequiredPermissions } from "./getRequiredPermissions.js";
export async function fixMissingChannelPerms(botGuildMember, channel) {
    const runGamePerms = getRequiredPermissions("RunGame");
    const before = getPermsFor(channel, botGuildMember, ...runGamePerms);
    const canManageChannel = before.can("ManageChannels");
    const canViewChannel = before.can("ViewChannel");
    if (!canManageChannel || !canViewChannel || before.missing.length) {
        return { canManageChannel, canViewChannel, permsCorrect: !before.missing.length };
    }
    const overwrites = {};
    for (const perm of before.missing) {
        overwrites[perm] = true;
    }
    let fixError = false;
    const errorHandler = (log) => {
        if (log) {
            const fnName = "fixMissingChannelPerms";
            const fnSection = "permissionOverwrites";
            const channelType = channel.type;
            const parentChannelType = channel.parent?.type;
            error({ fnName, fnSection, channelType, parentChannelType });
        }
        fixError = true;
        return null;
    };
    const updatedChannel = "permissionOverwrites" in channel
        ? await channel.permissionOverwrites.create(botGuildMember, overwrites).catch(() => errorHandler(false))
        : errorHandler(true);
    const after = getPermsFor(updatedChannel ?? channel, botGuildMember, ...runGamePerms);
    return {
        canManageChannel,
        canViewChannel,
        missingBefore: before.missing,
        fixAttempted: true,
        fixSuccess: !fixError,
        missingAfter: after.missing,
        permsCorrect: !after.missing.length
    };
}
