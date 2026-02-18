export function toChoice(choice) {
    if (Array.isArray(choice)) {
        return { name: choice[0], value: choice[1] };
    }
    if (typeof (choice) === "string" || typeof (choice) === "number") {
        return { name: String(choice), value: choice };
    }
    return { name: choice.name, value: choice.value ?? choice.name };
}
