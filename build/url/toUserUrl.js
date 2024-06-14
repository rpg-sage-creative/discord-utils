export function toUserUrl(user) {
    const userId = typeof (user) === "string" ? user : user?.id;
    return userId ? `https://discordapp.com/users/${userId}` : undefined;
}
