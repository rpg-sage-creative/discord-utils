import { unwrap } from "@rsc-utils/core-utils";
import { isUrl } from "@rsc-utils/io-utils";
export function urlOrUndefined(value) {
    const bool = isUrl(value, { wrapChars: "<>", wrapOptional: true });
    if (bool) {
        return unwrap(value, "<>");
    }
    return undefined;
}
