import { getUrlRegex, isWrapped, wrap } from "@rsc-utils/core-utils";
export function wrapUrl(content, all) {
    if (all) {
        const regex = getUrlRegex({ gFlag: "g", wrapChars: "<>", wrapOptional: true });
        return content.replace(regex, url => isWrapped(url, "<>") ? url : wrap(url, "<>"));
    }
    const regex = getUrlRegex({ anchored: true });
    return regex.test(content) ? wrap(content, "<>") : content;
}
