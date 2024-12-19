import { escapeRegex } from "@rsc-utils/core-utils";
function letterToCharacterClass(letter) {
    switch (letter) {
        case "e": return "[e3]";
        case "i": return "[il1]";
        case "o": return "[o0]";
        case "s": return "[s5]";
        default: return letter;
    }
}
function getInvalidNames() {
    return [
        { name: "everyone", anchored: true, variants: true },
        { name: "here", anchored: true, variants: true },
        { name: "discord", variants: true },
        { name: "clyde" },
        { name: "wumpus", },
        { name: "```" },
    ];
}
export function isInvalidName(name) {
    if (name) {
        const lower = name.toLowerCase().trim();
        const invalidNames = getInvalidNames();
        for (const { anchored, escaped, name, variants } of invalidNames) {
            let source = name;
            if (escaped) {
                source = escapeRegex(source);
            }
            if (variants) {
                const letters = name.split("");
                const characterClasses = letters.map(letterToCharacterClass);
                source = characterClasses.join("");
            }
            if (anchored) {
                source = `^${source}$`;
            }
            const regex = new RegExp(source);
            if (regex.test(lower)) {
                return name;
            }
        }
    }
    return false;
}
