import type { Optional, OrNull } from "@rsc-utils/type-utils";
import type { DUser } from "./types.js";
export declare function userToProfileUrl(author: DUser): string;
export declare function userToProfileUrl(author: Optional<DUser>): OrNull<string>;
