export function isChannel(value) {
    return value ? "isThread" in value : false;
}
