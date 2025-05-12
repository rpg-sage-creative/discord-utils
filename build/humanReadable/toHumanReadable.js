import { toChannelName } from "./toChannelName.js";
import { toGuildMemberName } from "./toGuildMemberName.js";
import { toGuildName } from "./toGuildName.js";
import { toUserName } from "./toUserName.js";
import { toWebhookName } from "./toWebhookName.js";
export function toHumanReadable(target) {
    if (target) {
        if ("token" in target) {
            return toWebhookName(target);
        }
        if ("createDM" in target) {
            if ("user" in target) {
                return toGuildMemberName(target);
            }
            else {
                return toUserName(target);
            }
        }
        if ("username" in target) {
            return toUserName(target);
        }
        if ("channel" in target) {
            return toChannelName(target);
        }
        if ("discoverySplash" in target) {
            return toGuildName(target);
        }
        return toChannelName(target);
    }
    return undefined;
}
