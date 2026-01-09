export function unwrapUrl(url) {
    if (!url)
        return url;
    return url.startsWith("<") && url.endsWith(">")
        ? url.slice(1, -1)
        : url;
}
