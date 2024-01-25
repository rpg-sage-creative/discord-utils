import { Optional, OrNull } from "@rsc-utils/type-utils";
import { Guild } from "discord.js";
export declare function toInviteUrl(guild: Optional<Guild>): OrNull<string>;
