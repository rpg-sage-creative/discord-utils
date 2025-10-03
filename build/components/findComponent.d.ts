import type { Optional } from "@rsc-utils/core-utils";
import type { ActionRowComponent, ComponentInContainer, TopLevelComponent } from "discord.js";
type Component = ActionRowComponent | ComponentInContainer | TopLevelComponent;
type Owner = {
    components: Component[];
};
export declare function findComponent<T extends ActionRowComponent>(owner: Optional<Owner>, customId: string): T | undefined;
export {};
