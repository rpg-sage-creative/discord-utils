import { error } from "@rsc-utils/console-utils";
import { Optional, OrNull } from "@rsc-utils/type-utils";
import { Guild } from "discord.js";

export function toInviteUrl(guild: Optional<Guild>): OrNull<string> {
	if (!guild) {
		return null;
	}
	try {
		const bestInvite = guild.invites.cache.find(invite => !invite.stageInstance && !invite.targetUser && !invite.temporary && !!invite.channel.isText);
		return bestInvite?.url ?? null;
	}catch(ex) {
		error(ex);
	}
	return null;
}