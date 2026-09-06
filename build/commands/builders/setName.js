/** shortcut for setting name/desc on all objects, also cleans the name for the API */
export function setName(builder, hasName) {
    try {
        builder.setName(hasName.name.toLowerCase().replace(/\s+/g, "-"));
        builder.setDescription(hasName.description ?? hasName.name);
    }
    catch (ex) {
        console.error(`${hasName.name}: ${hasName.description}`);
    }
    return builder;
}
