import type { Optional, OrUndefined } from "@rsc-utils/core-utils";
import { type UserIdResolvable } from "../resolve/resolveUserId.js";
export declare function toUserUrl(user: UserIdResolvable): string;
export declare function toUserUrl(user: Optional<UserIdResolvable>): OrUndefined<string>;
