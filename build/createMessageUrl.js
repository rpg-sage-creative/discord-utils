import { DiscordKey } from "./DiscordKey.js";
export function createMessageUrl(msgOrRef) {
    return DiscordKey.toMessageUrl(msgOrRef);
}
