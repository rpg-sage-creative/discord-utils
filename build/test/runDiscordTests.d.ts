import { type Awaitable } from "@rsc-utils/core-utils";
import { Client } from "discord.js";
type DiscordTestFn = (client: Client) => Awaitable<void>;
/** Creates and logs into a discordjs Client that is then passed to the given test function ... all wrapped in the runTests logic from core-utils. */
export declare function runDiscordTests(testFn: DiscordTestFn, exitOnFail: boolean): Promise<void>;
export declare function runDiscordTests(testFn: DiscordTestFn, token: string): Promise<void>;
export declare function runDiscordTests(testFn: DiscordTestFn, exitOnFail: boolean, token: string): Promise<void>;
export {};
