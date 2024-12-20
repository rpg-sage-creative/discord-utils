import { type Optional } from "@rsc-utils/core-utils";
type InvalidUsername = {
    /** is it only invalid when anchored (the whole name vs part of a name) */
    anchored?: boolean;
    /** the "root" name, ex: "discord" or "wumpus" */
    name: string;
    /** do we need to check l33t variants? */
    variants?: boolean;
};
/**
 * If the name isn't defined or has an invalid length, true is returned.
 * If a banned name is found, the "root" value (not the specific variant) is returned.
 * Otherwise, false is returned.
 */
export declare function isInvalidWebhookUsername(name: Optional<string>): string | boolean;
export declare function addInvalidWebhookUsername(username: string | undefined, invalidName: string): {
    old: {
        anchored?: boolean;
        name?: string | undefined;
        variants?: boolean;
    };
    new: {
        name: string;
        anchored: boolean;
    };
    found?: undefined;
} | {
    old: {
        anchored?: boolean;
        name?: string | undefined;
        variants?: boolean;
    };
    new: InvalidUsername;
    found?: undefined;
} | {
    found: InvalidUsername;
    old?: undefined;
    new?: undefined;
};
export {};
