import type { SlashCommandChoice } from "../index.js";
type Choice<T extends string | number> = {
    name: string;
    value: T;
};
/** Makes sure no matter how i give/set the choice it converts to what the API needs. */
export declare function toChoice<T extends string | number>(choice: SlashCommandChoice): Choice<T>;
export {};
