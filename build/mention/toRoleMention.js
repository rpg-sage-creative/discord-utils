import {} from "@rsc-utils/core-utils";
import { roleMention } from "discord.js";
export function toRoleMention(id) {
    return id ? roleMention(id) : undefined;
}
