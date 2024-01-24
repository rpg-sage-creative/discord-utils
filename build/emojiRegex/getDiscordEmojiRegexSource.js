export function getDiscordEmojiRegexSource(options) {
    let a = "";
    if (options?.animated) {
        a = options.animated === true ? "a" : "a?";
    }
    return `<${a}:\\w{2,}:\\d{16,}>`;
}
