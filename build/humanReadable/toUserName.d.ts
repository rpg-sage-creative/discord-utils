import type { Optional } from "@rsc-utils/core-utils";
import type { UserResolvable } from "../types/types.js";
/** Returns the user name as a readable mention or "@UnknownUser" */
export declare function toUserName(user: Optional<UserResolvable>): string;
