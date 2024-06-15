export function isChannel(value) {
    return value ? "isThread" in value : false;
}
export function isDMBased(value) {
    return isChannel(value) && value.isDMBased();
}
export function isGroupDMBased(value) {
    return isDMBased(value) && "recipients" in value;
}
export function isGuildBased(value) {
    return isChannel(value) && "guild" in value;
}
export function isMessage(value) {
    return value ? "author" in value : false;
}
export function isMessageTarget(value) {
    return value ? "send" in value : false;
}
export function isNonThread(value) {
    return isChannel(value) && !value.isThread();
}
export function isThread(value) {
    return isChannel(value) && value.isThread();
}
export function isUser(value) {
    return value ? "createDM" in value : false;
}
export function isWebhookChannel(value) {
    return isChannel(value) && "fetchWebhooks" in value;
}
