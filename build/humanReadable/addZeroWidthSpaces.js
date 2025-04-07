export function addZeroWidthSpaces(value) {
    return value
        .replace(/@(?!\u200B)/g, `@\u200B`)
        .replace(/(?<!\u200B)\|/g, `\u200B|`);
}
