export function isMessageTarget(value) {
    return value ? "send" in value : false;
}
