import { isGameChannel } from "./isGameChannel.js";
export function isWebhookGameChannel(channel) {
    return isGameChannel(channel) && "fetchWebhooks" in channel;
}
