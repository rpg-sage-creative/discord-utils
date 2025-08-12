
import { ZERO_WIDTH_SPACE, type Optional } from "@rsc-utils/core-utils";
import type { Role } from "discord.js";
import { toGuildName } from "../toGuildName.js";

/** @internal */
export function roleToName(role: Optional<Role>): string | undefined {
	if (role) {
		const guildName = toGuildName(role.guild);
		const roleName = role.name ?? role.id;
		return `${guildName}@${ZERO_WIDTH_SPACE}${roleName}`;
	}
	return undefined;
}