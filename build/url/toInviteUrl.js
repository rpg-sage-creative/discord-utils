import { error } from "@rsc-utils/core-utils";
import { Guild } from "discord.js";
export function toInviteUrl(guild) {
    if (!guild) {
        return undefined;
    }
    try {
        const bestInvite = guild.invites.cache.find(invite => {
            if (!invite.channel?.isTextBased())
                return false;
            if (invite.guildScheduledEvent)
                return false;
            if (invite.maxAge)
                return false;
            if (invite.maxUses)
                return false;
            if (invite.stageInstance)
                return false;
            if (invite.targetApplication)
                return false;
            if (invite.targetUser)
                return false;
            if (invite.targetType)
                return false;
            if (invite.temporary)
                return false;
            return true;
        });
        return bestInvite?.url ?? undefined;
    }
    catch (ex) {
        error(ex);
    }
    return undefined;
}
