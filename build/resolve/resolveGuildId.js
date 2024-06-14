export function resolveGuildId(resolvable) {
    if (resolvable) {
        if (typeof (resolvable) === "string") {
            return resolvable;
        }
        if ("guild" in resolvable) {
            return resolvable.guild?.id;
        }
        return resolvable.id;
    }
    return undefined;
}
