import type { Optional } from "@rsc-utils/core-utils";
import type { AnyThreadChannel, Channel } from "discord.js";
import type { UserOrPartial } from "../types.js";
export declare function isThreadChannel(value: Optional<Channel | UserOrPartial>): value is AnyThreadChannel;
