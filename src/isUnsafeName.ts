import type { Optional } from "@rsc-utils/core-utils";

/** Checks to see if the name contains something that Discord won't allow. */
export function isUnsafeName(name: Optional<string>): "discord" | false {
	if (name) { // NOSONAR (I am leaving the code like this in case we wanna add other words later)

		/*
		"discord" (as of 2024/12/07)
		Invalid:
			d: d
			i: [il1]
			s: [s5]
			c: c
			o: [o0]
			r: r
			d: d

		Allowed:
			d:
			i:
			s: $
			c: k
			o:
			r:
			d:
		*/
		if (/d[il1][s5]c[o0]rd/i.test(name)) {
			return "discord";
		}

	}
	return false;
}