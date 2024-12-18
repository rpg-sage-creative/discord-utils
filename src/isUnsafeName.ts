import type { Optional } from "@rsc-utils/core-utils";

/** converts each letter to a regex character class. */
function letterToCharacterClass(letter: string): string {
	switch(letter) {
		// found as problematic for "everyone"
		case "e": return "[e3]";
		// found as problematic for "discord"
		case "i": return "[il1]";
		// found as problematic for "discord"
		case "o": return "[o0]";
		// found as problematic for "discord"
		case "s": return "[s5]";
		default: return letter;
	}
}

function nameToRegex(name: string, anchored: boolean): RegExp {
	const letters = name.split("");
	const characterClasses = letters.map(letterToCharacterClass);
	const source = characterClasses.join("");
	const regex = anchored ? `^${source}$` : source;
	return new RegExp(regex);
}

export type UnsafeNameData = {
	/** sets how the value is tested */
	type: "anchored" | "chars" | "partial";
	/** the value found */
	value: string;
};

/**
 * https://discord.com/developers/docs/resources/user
 * List current as of 2024/12/18
 * The following are listed as banned but don't throw errors (yet): @, #, :
 *
 * Not part the page's list but discovered through error: clyde, wumpus
 *
 * @todo make this a text file or something that can be reloaded without a restart.
 */
function getUnsafeNameData(): UnsafeNameData[] {
	return [
		{ type:"anchored", value:"everyone" },
		{ type:"anchored", value:"here" },

		{ type:"partial", value:"discord" },
		{ type:"partial", value:"clyde" },
		{ type:"partial", value:"wumpus" },

		// { type:"chars", value:"@" },
		// { type:"chars", value:"#" },
		// { type:"chars", value:":" },
		{ type:"chars", value:"```" },
	];
}

/** Checks to see if the name contains something that Discord won't allow. */
export function isUnsafeName(name: Optional<string>): UnsafeNameData | false {
	if (name) {
		const lower = name.toLowerCase().trim();

		const unsafeData = getUnsafeNameData();
		for (const pair of unsafeData) {
			const { type, value } = pair;

			if (["anchored", "partial"].includes(type) && nameToRegex(value, type === "anchored").test(lower)) {
				return pair;
			}

			if (type === "chars" && lower.includes(value)) {
				return pair;
			}
		}
	}
	return false;
}