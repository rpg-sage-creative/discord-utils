import {} from "@rsc-utils/core-utils";
import { DiscordMaxValues } from "../types/DiscordMaxValues.js";
function letterToCharacterClass(letter) {
    switch (letter) {
        case "e": return "[eë3]";
        case "i": return "[il1]";
        case "o": return "[o0]";
        case "s": return "[s5]";
        default: return letter;
    }
}
const invalidNames = [
    { name: "everyone" },
    { name: "here" },
    { name: "discord", variants: true },
    { name: "clyde" },
    { name: "wumpus", },
    { name: "```" },
];
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
const invalidNamesRegExps = invalidNames.map(createInvalidTestRegex);
export function isInvalidWebhookUsername(name) {
    if (!name) {
        return true;
    }
    const { minLength, maxLength } = DiscordMaxValues.webhook.username;
    if (name.length < minLength || name.length > maxLength) {
        return true;
    }
    for (let i = 0; i < invalidNames.length; i++) {
        if (invalidNamesRegExps[i].test(name)) {
            return invalidNames[i].name;
        }
    }
    return false;
}
export function addInvalidWebhookUsername(username = "UNDEFINED USERNAME", invalidName) {
    const found = invalidNames.find(invalid => invalid.name === invalidName);
    const old = { ...found };
    const anchored = username.length === invalidName.length;
    const variant = !username.toLowerCase().includes(invalidName.toLowerCase());
    if (!found) {
        const invalidUsername = { name: invalidName, anchored };
        invalidNames.push(invalidUsername);
        invalidNamesRegExps.push(createInvalidTestRegex(invalidUsername));
        return { old, new: invalidUsername };
    }
    if (found.anchored && !anchored) {
        found.anchored = false;
        return { old, new: found };
    }
    if (!found.variants && variant) {
        found.variants = true;
        return { old, new: found };
    }
    return { found };
}
