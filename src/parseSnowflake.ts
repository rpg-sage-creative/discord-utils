import type { Snowflake } from "@rsc-utils/snowflake-utils";
import type { Optional } from "@rsc-utils/type-utils";

export function parseSnowflake(value: Optional<string>): Snowflake | null {
	return /\d{16,}/.exec(value ?? "")?.[0] ?? null;
}