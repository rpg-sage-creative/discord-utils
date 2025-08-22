import { getEmojiRegex } from "../emoji/getEmojiRegex.js";
import { tokenize } from "@rsc-utils/core-utils";
let roleRegex;
function getRoleRegex() { return roleRegex ??= /<@&\d{16,}>/; }
let userRegex;
function getUserRegex() { return userRegex ??= /<@\d{16,}>/; }
function scrubBlankTokens(tokens) {
    const output = tokens.slice();
    let leftIndex = -1;
    let rightIndex = -1;
    const findIndexes = (fromIndex) => {
        leftIndex = output.indexOf("`", fromIndex + 1);
        rightIndex = output.indexOf("`", leftIndex + 1);
        return leftIndex > -1 && rightIndex > -1;
    };
    while (findIndexes(rightIndex)) {
        const slice = output.slice(leftIndex, rightIndex + 1).slice(1, -1);
        const isBlank = slice.every(s => !s.trim());
        if (isBlank) {
            output.splice(rightIndex, 1);
            output.splice(leftIndex, 1);
            rightIndex -= 2;
        }
    }
    return output;
}
export function correctEscapedMentions(value, options) {
    if (!options.emoji && !options.roles && !options.users)
        return value;
    let parsers;
    const getParsers = () => {
        if (!parsers) {
            parsers = {};
            if (options.emoji)
                parsers.emoji = getEmojiRegex();
            if (options.roles)
                parsers.role = getRoleRegex();
            if (options.users)
                parsers.user = getUserRegex();
        }
        return parsers;
    };
    return value.replace(/`[^`]+`/gu, escapedValue => {
        const tokens = tokenize(escapedValue.slice(1, -1), getParsers());
        let output = [];
        let isMention = false;
        let isEscaped = false;
        tokens.forEach(token => {
            isMention = ["emoji", "role", "user"].includes(token.key);
            if (isMention === isEscaped) {
                output.push("`");
                isEscaped = !isEscaped;
            }
            output.push(token.token);
        });
        if (!isMention) {
            output.push("`");
        }
        output = scrubBlankTokens(output);
        return output.join("");
    });
}
