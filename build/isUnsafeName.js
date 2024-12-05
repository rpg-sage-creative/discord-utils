export function isUnsafeName(name) {
    if (name) {
        if (/d[il1][s5]c[o0]rd/i.test(name)) {
            return "discord";
        }
    }
    return false;
}
