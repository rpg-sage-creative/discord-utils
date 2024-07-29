import { toUserName } from "./toUserName.js";
export function toWebhookName(webhook) {
    if (webhook) {
        if (webhook.sourceGuild) {
            return `${webhook.sourceGuild.name}$${webhook.name}`;
        }
        if (webhook.owner) {
            return `${toUserName(webhook.owner)}$${webhook.name}`;
        }
        return `$${webhook.name}`;
    }
    return "$UnknownWebhook";
}
