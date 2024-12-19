import {} from "@rsc-utils/core-utils";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
function letterToCharacterClass(letter) {
    switch (letter) {
        case "e": return "[e3]";
        case "i": return "[il1]";
        case "o": return "[o0]";
        case "s": return "[s5]";
        default: return letter;
    }
}
function getInvalidWebhookUsernames() {
    return [
        { name: "everyone", anchored: true, variants: true },
        { name: "here", anchored: true, variants: true },
        { name: "discord", variants: true },
        { name: "clyde" },
        { name: "wumpus", },
        { name: "```" },
    ];
}
function createInvalidTestRegex({ anchored, name, variants }) {
    let source = name;
    if (variants) {
        const letters = name.split("");
        const characterClasses = letters.map(letterToCharacterClass);
        source = characterClasses.join("");
    }
    if (anchored) {
        source = `^${source}$`;
    }
    return new RegExp(source, "i");
}
export function isInvalidWebhookUsername(name) {
    if (!name) {
        return true;
    }
    const { minLength, maxLength } = DiscordMaxValues.webhook.username;
    if (name.length < minLength || name.length > maxLength) {
        return true;
    }
    const invalidNames = getInvalidWebhookUsernames();
    for (const invalidName of invalidNames) {
        const regex = createInvalidTestRegex(invalidName);
        if (regex.test(name)) {
            return invalidName.name;
        }
    }
    return false;
}
