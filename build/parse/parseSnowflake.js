export function parseSnowflake(value) {
    return /(?<id>\d{16,})/.exec(value ?? "")?.groups?.id ?? null;
}
