import {} from "@rsc-utils/core-utils";
import {} from "../types.js";
export function toUserUrl(user) {
    const userId = typeof (user) === "string" ? user : user?.id;
    return userId ? `https://discordapp.com/users/${userId}` : null;
}
