import { orNilSnowflake } from "@rsc-utils/core-utils";
export function resolveSnowflake(resolvable, orNil) {
    const out = orNil ? orNilSnowflake : (value) => value;
    if (resolvable) {
        if (typeof (resolvable) === "string") {
            return out(resolvable);
        }
        if ("did" in resolvable) {
            return out(resolvable.did);
        }
        if ("id" in resolvable) {
            return out(resolvable.id);
        }
    }
    return out(undefined);
}
