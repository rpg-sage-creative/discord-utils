export declare const DiscordMaxValues: {
    /** slash commands, message commands, user commands */
    command: {
        /** required */
        nameLength: number;
        /** required for CHAT_INPUT; empty string ("") for USER and MESSAGE */
        descriptionLength: number;
        option: {
            count: number;
            /** required */
            nameLength: number;
            /** required */
            descriptionLength: number;
            choice: {
                count: number;
                /** required */
                nameLength: number;
                /** required */
                valueLength: number;
            };
        };
        totalLength: number;
        slashCount: number;
        messageCount: number;
        userCount: number;
    };
    /** message components */
    component: {
        button: {
            idLength: number;
            labelLength: number;
        };
        row: {
            count: number;
            buttonCount: number;
            selectCount: number;
        };
        select: {
            idLength: number;
            labelLength: number;
            optionCount: number;
            placeholderLength: number;
        };
    };
    /** modal popups */
    modal: {
        field: {
            count: number;
            idLength: number;
            labelLength: number;
            placeholderLength: number;
            valueLength: number;
        };
    };
    /** message embeds */
    embed: {
        titleLength: number;
        descriptionLength: number;
        field: {
            count: number;
            nameLength: number;
            valueLength: number;
        };
        footerTextLength: number;
        authorNameLength: number;
        totalLength: number;
    };
    /** message */
    message: {
        contentLength: number;
        embedCount: number;
    };
    /** user */
    user: {
        username: {
            minLength: number;
            maxLength: number;
        };
    };
    /** webhook */
    webhook: {
        username: {
            minLength: number;
            maxLength: number;
        };
    };
};
