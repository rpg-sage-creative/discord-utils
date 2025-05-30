import { isWrapped, wrap } from "@rsc-utils/core-utils";
import { getUrlRegex } from "@rsc-utils/io-utils";
export function wrapUrl(content, all) {
    if (all) {
        const regex = getUrlRegex({ gFlag: "g", wrapChars: "<>", wrapOptional: true });
        return content.replace(regex, url => isWrapped(url, "<>") ? url : wrap(url, "<>"));
    }
    const regex = getUrlRegex({ anchored: true });
    return regex.test(content) ? wrap(content, "<>") : content;
}
