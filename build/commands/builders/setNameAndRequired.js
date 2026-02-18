import { setName } from "./setName.js";
export function setNameAndRequired(opt, option) {
    setName(opt, option);
    opt.setRequired(option.isRequired === true);
    return opt;
}
