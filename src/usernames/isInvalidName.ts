import { escapeRegex, type Optional } from "@rsc-utils/core-utils";

/** converts each letter to a regex character class. */
function letterToCharacterClass(letter: string): string {
	switch(letter) {
		// found as problematic for "everyone" and "here"
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

type UnsafeNameData = {
	anchored?: boolean;
	escaped?: boolean;
	name: string;
	variants?: boolean;
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
function getInvalidNames(): UnsafeNameData[] {
	return [
		{ name:"everyone", anchored:true, variants:true },
		{ name:"here",     anchored:true, variants:true },

		{ name:"discord",  variants:true },
		{ name:"clyde"     },
		{ name:"wumpus",   },

		{ name:"```" },
	];
}

/**
 * Checks to see if the name contains something that Discord won't allow.
 * If found, returns the "root" value being looked for, not the specific variant.
 * If not round, returns false.
 */
export function isInvalidName(name: Optional<string>): string | false {
	if (name) {
		const lower = name.toLowerCase().trim();

		const unsafeData = getInvalidNames();
		for (const pair of unsafeData) {
			const { anchored, escaped, name, variants } = pair;

			let source = name;
			if (escaped) {
				source = escapeRegex(source);
			}
			if (variants) {
				const letters = name.split("");
				const characterClasses = letters.map(letterToCharacterClass);
				source = characterClasses.join("");
			}
			if (anchored) {
				source = `^${source}$`;
			}

			const regex = new RegExp(source);
			if (regex.test(lower)) {
				return name;
			}
		}
	}
	return false;
}