import type { Optional, OrNull } from "@rsc-utils/core-utils";
import type { Guild } from "discord.js";
export declare function toInviteUrl(guild: Optional<Guild>): OrNull<string>;
