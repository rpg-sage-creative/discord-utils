import { isChannel } from "./isChannel.js";
export function isWebhookChannel(value) {
    return isChannel(value) && "fetchWebhooks" in value;
}
