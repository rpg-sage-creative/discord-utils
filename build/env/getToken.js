import { getFromProcess } from "@rsc-utils/core-utils";
export function getToken() {
    const tokenValidator = (value) => typeof (value) === "string" && value.length;
    return getFromProcess(tokenValidator, "botToken");
}
