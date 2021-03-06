export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

