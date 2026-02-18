import type { BuilderOrOption, NameAndDescription } from "../index.js";
/** shortcut for setting name/desc on all objects, also cleans the name for the API */
export declare function setName<T extends BuilderOrOption>(builder: T, hasName: NameAndDescription): T;
