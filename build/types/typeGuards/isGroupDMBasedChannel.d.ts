import type { Optional } from "@rsc-utils/core-utils";
import type { Channel, PartialGroupDMChannel } from "discord.js";
import type { UserOrPartial } from "../types.js";
export declare function isGroupDMBasedChannel(value: Optional<Channel | UserOrPartial>): value is PartialGroupDMChannel;
