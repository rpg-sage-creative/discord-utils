import { ZERO_WIDTH_SPACE } from "@rsc-utils/core-utils";
import { toGuildName } from "../toGuildName.js";
export function roleToName(role) {
    if (role) {
        const guildName = toGuildName(role.guild);
        const roleName = role.name ?? role.id;
        return `${guildName}@${ZERO_WIDTH_SPACE}${roleName}`;
    }
    return undefined;
}
