export async function fetchIfPartial(value) {
    if (value?.partial) {
        return value.fetch();
    }
    return value;
}
