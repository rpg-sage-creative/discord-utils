import { getUrlRegex } from "@rsc-utils/io-utils";
export function wrapUrls(content) {
    if (!content)
        return content;
    const regex = getUrlRegex({ gFlag: "g", wrapChars: "<>", wrapOptional: true });
    return content.replace(regex, url => url.startsWith("<") ? url : `<${url}>`);
}
