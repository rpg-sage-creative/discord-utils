import type { Optional, OrNull, OrUndefined } from "@rsc-utils/core-utils";
/**
 * If the given value is a url wrapped in <> then the <> are removed and the url is returned.
 * Otherwise, the given value is returned.
 */
export declare function unwrapUrl(url: string): string;
export declare function unwrapUrl(url: OrNull<string>): OrNull<string>;
export declare function unwrapUrl(url: OrUndefined<string>): OrUndefined<string>;
export declare function unwrapUrl(url: Optional<string>): Optional<string>;
