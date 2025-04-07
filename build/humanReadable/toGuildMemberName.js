import { addZeroWidthSpaces } from "./addZeroWidthSpaces.js";
import { toUserName } from "./toUserName.js";
export function toGuildMemberName(member) {
    if (member) {
        if (member.nickname) {
            return addZeroWidthSpaces(`@${member.nickname}`);
        }
        return toUserName(member.user);
    }
    return "@UnknownGuildMember";
}
