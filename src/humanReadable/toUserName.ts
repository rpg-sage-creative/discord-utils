import type { Optional } from "@rsc-utils/core-utils";
import type { UserResolvable } from "../types/types.js";
import { addZeroWidthSpaces } from "./addZeroWidthSpaces.js";

/** Returns the user name as a readable mention or "@UnknownUser" */
export function toUserName(user: Optional<UserResolvable>): string {
	if (user) {
		if ("displayName" in user && user.displayName) {
			return addZeroWidthSpaces(`@${user.displayName}`);
		}
		if ("discriminator" in user) {
			const discriminator = (user.discriminator ?? "0") !== "0" ? `#${user.discriminator}` : ``;
			return addZeroWidthSpaces(`@${user.username}${discriminator}`);
		}
		return addZeroWidthSpaces(`@${user.username}`);
	}
	return "@UnknownUser";
}