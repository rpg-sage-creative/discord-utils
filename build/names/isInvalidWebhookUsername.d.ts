import { type Optional } from "@rsc-utils/core-utils";
/**
 * If the name isn't defined or has an invalid length, true is returned.
 * If a banned name is found, the "root" value (not the specific variant) is returned.
 * Otherwise, false is returned.
 */
export declare function isInvalidWebhookUsername(name: Optional<string>): string | boolean;
