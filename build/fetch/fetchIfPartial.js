export async function fetchIfPartial(value) {
    if (value?.partial) {
        return value.fetch().catch(() => undefined);
    }
    return value;
}
