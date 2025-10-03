import { addZeroWidthSpaces } from "./addZeroWidthSpaces.js";
import { toGuildName } from "./toGuildName.js";
export function toRoleName(role) {
    if (role) {
        const guildName = toGuildName(role.guild);
        return addZeroWidthSpaces(`${guildName}@${role.name}`);
    }
    return "@UnknownRole";
}
