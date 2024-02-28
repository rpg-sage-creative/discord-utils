export const DiscordMaxValues = {
    command: {
        nameLength: 32,
        descriptionLength: 100,
        option: {
            count: 25,
            nameLength: 32,
            descriptionLength: 100,
            choice: {
                count: 25,
                nameLength: 100,
                valueLength: 100
            }
        },
        totalLength: 8000,
        slashCount: 100,
        messageCount: 5,
        userCount: 5
    },
    embed: {
        titleLength: 256,
        descriptionLength: 4096,
        field: {
            count: 25,
            nameLength: 256,
            valueLength: 1024
        },
        footerTextLength: 2048,
        authorNameLength: 256,
        totalLength: 6000
    },
    message: {
        contentLength: 2000,
        embedCount: 10,
    },
    usernameLength: 80
};
