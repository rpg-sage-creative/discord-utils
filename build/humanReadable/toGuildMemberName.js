import { ZERO_WIDTH_SPACE } from "@rsc-utils/string-utils";
import { toUserName } from "./toUserName.js";
export function toGuildMemberName(member) {
    if (member) {
        if (member.nickname) {
            return `@${ZERO_WIDTH_SPACE}${member.nickname}`;
        }
        return toUserName(member.user);
    }
    return "@UnknownGuildMember";
}
