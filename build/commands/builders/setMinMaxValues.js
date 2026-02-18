import { isFiniteNumber } from "@rsc-utils/core-utils";
export function setMinMaxValues(opt, option) {
    if (isFiniteNumber(option.minValue)) {
        opt.setMinValue(option.minValue);
    }
    if (isFiniteNumber(option.maxValue)) {
        opt.setMaxValue(option.maxValue);
    }
    return opt;
}
