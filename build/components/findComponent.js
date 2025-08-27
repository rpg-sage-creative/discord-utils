export function findComponent(owner, customId) {
    if (!owner)
        return undefined;
    const components = owner.components ?? [];
    for (const component of components) {
        if ("customId" in component && component.customId === customId) {
            return component;
        }
        if ("components" in component) {
            const found = findComponent(component, customId);
            if (found) {
                return found;
            }
        }
    }
    return undefined;
}
