import type { Optional, OrNull } from "@rsc-utils/type-utils";
import type { DUserResolvable } from "../types.js";
export declare function toUserUrl(user: DUserResolvable): string;
export declare function toUserUrl(user: Optional<DUserResolvable>): OrNull<string>;
