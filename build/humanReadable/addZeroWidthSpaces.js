export function addZeroWidthSpaces(value) {
    return value
        // avoid @here and @everybody
        .replace(/@(?!\u200B)/g, `@\u200B`)
        // fix spoilers
        .replace(/(?<!\u200B)\|/g, `\u200B|`);
}
