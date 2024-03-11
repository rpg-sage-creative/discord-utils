import { createUrlRegex, isWrapped, wrap } from "@rsc-utils/string-utils";
export function wrapUrl(content, all) {
    if (all) {
        const regex = createUrlRegex({ globalFlag: true, wrapChars: "<>", wrapOptional: true });
        return content.replace(regex, url => isWrapped(url, "<>") ? url : wrap(url, "<>"));
    }
    const regex = createUrlRegex({ anchored: true });
    return regex.test(content) ? wrap(content, "<>") : content;
}
