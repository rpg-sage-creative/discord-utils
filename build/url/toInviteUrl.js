import { error } from "@rsc-utils/console-utils";
export function toInviteUrl(guild) {
    if (!guild) {
        return null;
    }
    try {
        const bestInvite = guild.invites.cache.find(invite => !invite.stageInstance && !invite.targetUser && !invite.temporary && !!invite.channel.isText);
        return bestInvite?.url ?? null;
    }
    catch (ex) {
        error(ex);
    }
    return null;
}
