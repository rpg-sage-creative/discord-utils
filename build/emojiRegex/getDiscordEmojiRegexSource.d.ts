type Options = {
    animated?: boolean | "optional";
};
/**
 * Returns the string source of a discord emoji string.
 * Uses default options: { animated:"optional" }
 */
export declare function getDiscordEmojiRegexSource(): string;
/**
 * Returns the string source of a discord emoji string.
 */
export declare function getDiscordEmojiRegexSource(options: Options): string;
export {};
