export function isMessage(value) {
    return value ? "author" in value : false;
}
