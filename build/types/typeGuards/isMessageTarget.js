export function isMessageTarget(value) {
    if (value?.partial === false) {
        if ("isThread" in value) {
            return value.type === 0
                || value.type === 1
                || value.type === 11
                || value.type === 12;
        }
        return true;
    }
    return false;
}
