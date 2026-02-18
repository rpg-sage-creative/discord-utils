import { setMinMaxValues } from "./setMinMaxValues.js";
import { setNameAndRequired } from "./setNameAndRequired.js";
import { toChoice } from "./toChoice.js";
export function addOptions(builder, options) {
    options?.forEach(option => {
        const addHandler = (opt) => {
            setNameAndRequired(opt, option);
            if ("setMinValue" in opt)
                setMinMaxValues(opt, option);
            if ("addChoices" in opt) {
                option.choices?.forEach(choice => {
                    opt.addChoices(toChoice(choice));
                });
            }
            return opt;
        };
        if (option.isAttachment) {
            builder.addAttachmentOption(addHandler);
        }
        else if (option.isBoolean) {
            builder.addBooleanOption(addHandler);
        }
        else if (option.isChannel) {
            builder.addChannelOption(addHandler);
        }
        else if (option.isInteger) {
            builder.addIntegerOption(addHandler);
        }
        else if (option.isMentionable) {
            builder.addMentionableOption(addHandler);
        }
        else if (option.isNumber) {
            builder.addNumberOption(addHandler);
        }
        else if (option.isRole) {
            builder.addRoleOption(addHandler);
        }
        else if (option.isUser) {
            builder.addUserOption(addHandler);
        }
        else {
            builder.addStringOption(addHandler);
        }
        return builder;
    });
    return builder;
}
