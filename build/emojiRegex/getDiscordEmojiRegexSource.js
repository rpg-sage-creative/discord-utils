export function getDiscordEmojiRegexSource(options) {
    let a = "a?";
    if (options?.animated === true) {
        a = "a";
    }
    else if (options?.animated === false) {
        a = "";
    }
    return `<${a}:\\w{2,}:\\d{16,}>`;
}
