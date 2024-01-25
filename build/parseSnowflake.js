export function parseSnowflake(value) {
    return /\d{16,}/.exec(value ?? "")?.[0] ?? null;
}
