import type { Optional, OrNull, OrUndefined } from "@rsc-utils/core-utils";
/**
 * Wraps all urls in the content with <>.
 */
export declare function wrapUrls(content: string): string;
export declare function wrapUrls(content: OrNull<string>): OrNull<string>;
export declare function wrapUrls(content: OrUndefined<string>): OrUndefined<string>;
export declare function wrapUrls(content: Optional<string>): Optional<string>;
