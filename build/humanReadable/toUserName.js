import { addZeroWidthSpaces } from "./addZeroWidthSpaces.js";
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
