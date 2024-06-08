import { type Optional, type OrNull } from "@rsc-utils/core-utils";
import { type UserIdResolvable } from "../types.js";
export declare function toUserUrl(user: UserIdResolvable): string;
export declare function toUserUrl(user: Optional<UserIdResolvable>): OrNull<string>;
