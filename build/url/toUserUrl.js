import { resolveUserId } from "../resolve/resolveUserId.js";
export function toUserUrl(user) {
    const userId = resolveUserId(user);
    return userId ? `https://discordapp.com/users/${userId}` : undefined;
}
