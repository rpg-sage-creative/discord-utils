/** Converts the value into a human readable string intended for test output. */
export function toString(value) {
	if (value && (value instanceof RegExp)) {
		return `/${value.source}/${value.flags}`;
	}
	switch (typeof(value)) {
		case "bigint": return `${value}n`;
		case "object": return JSON.stringify(value);
		case "string": return JSON.stringify(value);
		default: return String(value);
	}
}