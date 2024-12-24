import { ZERO_WIDTH_SPACE } from "@rsc-utils/core-utils";
function addZeroWidthSpaces(value) {
    return value
        .replace(/@(?!\u200B)/g, `@${ZERO_WIDTH_SPACE}`)
        .replace(/(?<!\u200B)\|/g, `${ZERO_WIDTH_SPACE}|`);
}
export function toUserName(user) {
    if (user) {
        if ("displayName" in user && user.displayName) {
            return addZeroWidthSpaces(`@${user.displayName}`);
        }
        if ("discriminator" in user) {
            const discriminator = (user.discriminator ?? "0") !== "0" ? `#${user.discriminator}` : ``;
            return addZeroWidthSpaces(`@${user.username}${discriminator}`);
        }
        return addZeroWidthSpaces(`@${user.username}`);
    }
    return "@UnknownUser";
}
