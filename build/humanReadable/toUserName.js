import { ZERO_WIDTH_SPACE } from "@rsc-utils/string-utils";
export function toUserName(user) {
    if (user) {
        if ("displayName" in user && user.displayName) {
            return `@${ZERO_WIDTH_SPACE}${user.displayName}`;
        }
        if ("discriminator" in user) {
            const discriminator = (user.discriminator ?? "0") !== "0" ? `#${user.discriminator}` : ``;
            return `@${ZERO_WIDTH_SPACE}${user.username}${discriminator}`;
        }
        return `@${ZERO_WIDTH_SPACE}${user.username}`;
    }
    return "@UnknownUser";
}
