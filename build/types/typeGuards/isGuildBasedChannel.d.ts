import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, GuildBasedChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
export declare function isGuildBasedChannel(value: Optional<Channel | UserOrPartial>): value is GuildBasedChannel;
