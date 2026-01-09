import type { Optional, OrNull, OrUndefined } from "@rsc-utils/core-utils";
import { type WRAPPED_URL, type URL } from "@rsc-utils/io-utils";
/**
 * Wraps the given content in <> if it is a url.
 */
export declare function wrapUrl(url: URL): WRAPPED_URL;
export declare function wrapUrl(url: OrNull<URL>): OrNull<WRAPPED_URL>;
export declare function wrapUrl(url: OrUndefined<URL>): OrUndefined<WRAPPED_URL>;
export declare function wrapUrl(url: Optional<URL>): Optional<WRAPPED_URL>;
