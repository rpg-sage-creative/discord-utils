import type { Optional, OrNull } from "@rsc-utils/type-utils";
import type { DUser } from "./types.js";

export function userToProfileUrl(author: DUser): string;
export function userToProfileUrl(author: Optional<DUser>): OrNull<string>;
export function userToProfileUrl(author: Optional<DUser>): OrNull<string> {
	return author ? `https://discordapp.com/users/${author.id}` : null;
}