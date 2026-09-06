import { getUrlRegex } from "@rsc-utils/io-utils";
export function wrapUrl(url) {
    if (!url)
        return url;
    // wrap an unwrapped anchored url
    const regex = getUrlRegex({ anchored: true });
    const wrapped = regex.test(url) ? `<${url}>` : url;
    return wrapped;
}
