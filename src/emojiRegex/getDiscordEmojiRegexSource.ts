type Options = {
	animated?: boolean | "optional";
};

/**
 * Returns the string source of a discord emoji string.
 * Uses default options: { animated:"optional" }
 */
export function getDiscordEmojiRegexSource(): string;

/**
 * Returns the string source of a discord emoji string.
 */
export function getDiscordEmojiRegexSource(options: Options): string;

export function getDiscordEmojiRegexSource(options?: Options): string {
	let a = "";
	if (options?.animated) {
		a = options.animated === true ? "a" : "a?";
	}
	return `<${a}:\\w{2,}:\\d{16,}>`;
}