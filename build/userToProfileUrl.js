export function userToProfileUrl(author) {
    return author ? `https://discordapp.com/users/${author.id}` : null;
}
