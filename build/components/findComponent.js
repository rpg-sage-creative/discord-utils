import { getActionRows } from "./getActionRows.js";
export function findComponent(message, customId) {
    const actionRows = getActionRows(message);
    if (actionRows.length) {
        for (const row of actionRows) {
            for (const component of row.components) {
                if (component.customId === customId) {
                    return component;
                }
            }
        }
    }
    return undefined;
}
