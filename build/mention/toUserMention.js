import {} from "@rsc-utils/core-utils";
import { userMention } from "discord.js";
export function toUserMention(id) {
    return id ? userMention(id) : undefined;
}
