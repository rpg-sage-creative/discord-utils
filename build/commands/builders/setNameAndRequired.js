import { setName } from "./setName.js";
/** Expanded setName that also calls setRequired. */
export function setNameAndRequired(opt, option) {
    setName(opt, option);
    opt.setRequired(option.isRequired === true);
    return opt;
}
