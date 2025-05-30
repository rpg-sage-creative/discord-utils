import { type Optional } from "@rsc-utils/core-utils";
import { type VALID_URL } from "@rsc-utils/io-utils";
/** Checks that the valud is a valid url and returns the unwrapped url (removes <>). */
export declare function urlOrUndefined(value: Optional<string>): VALID_URL | undefined;
