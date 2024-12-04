import type { Optional } from "@rsc-utils/core-utils";
import type { Channel } from "discord.js";
import type { DMBasedChannel, UserOrPartial } from "../types.js";
export declare function isDMBasedChannel(value: Optional<Channel | UserOrPartial>): value is DMBasedChannel;
