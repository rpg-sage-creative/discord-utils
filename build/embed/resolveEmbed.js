export function resolveEmbed(resolvable) {
    if ("toJSON" in resolvable) {
        return resolvable.toJSON();
    }
    return resolvable;
}
