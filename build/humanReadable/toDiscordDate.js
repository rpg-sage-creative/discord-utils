import { isDate } from "util/types";
/** Creates a Discord formatted relative timestamp for the given Format. */
export function toDiscordDate(ts, format) {
    ts = isDate(ts) ? ts.getTime() : ts;
    const unix = Math.floor(ts / 1000);
    return `<t:${unix}:${format}>`;
}
