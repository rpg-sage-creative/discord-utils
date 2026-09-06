import { getFromProcess } from "@rsc-utils/core-utils";
export function getToken() {
    const tokenValidator = (value) => typeof (value) === "string" && value.length;
    // We only get this once, we don't need to store it in a variable.
    return getFromProcess(tokenValidator, "botToken");
}
