function letterToCharacterClass(letter) {
    switch (letter) {
        case "e": return "[e3]";
        case "i": return "[il1]";
        case "o": return "[o0]";
        case "s": return "[s5]";
        default: return letter;
    }
}
function nameToRegex(name, anchored) {
    const letters = name.split("");
    const characterClasses = letters.map(letterToCharacterClass);
    const source = characterClasses.join("");
    const regex = anchored ? `^${source}$` : source;
    return new RegExp(regex);
}
function getUnsafeNameData() {
    return [
        { type: "anchored", value: "everyone" },
        { type: "anchored", value: "here" },
        { type: "partial", value: "discord" },
        { type: "partial", value: "clyde" },
        { type: "partial", value: "wumpus" },
        { type: "chars", value: "```" },
    ];
}
export function isUnsafeName(name) {
    if (name) {
        const lower = name.toLowerCase().trim();
        const unsafeData = getUnsafeNameData();
        for (const pair of unsafeData) {
            const { type, value } = pair;
            if (["anchored", "partial"].includes(type) && nameToRegex(value, type === "anchored").test(lower)) {
                return value;
            }
            if (type === "chars" && lower.includes(value)) {
                return value;
            }
        }
    }
    return false;
}
