export function isUser(value) {
    return value ? "createDM" in value : false;
}
