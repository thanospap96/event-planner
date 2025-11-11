import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
    const options: swaggerJsdoc.Options = {
        definition: {
            openapi: "3.0.3",
            info: {
                title: "Event Planner API",
                version: "1.0.0",
                description: "Auth & Users endpoints",
            },
            servers: [{ url: "http://localhost:5000" }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
                schemas: {
                    RegisterRequest: {
                        type: "object",
                        required: ["username", "email", "password"],
                        properties: {
                            username: { type: "string", example: "nicktest" },
                            email: { type: "string", format: "email", example: "nick@test.com" },
                            password: { type: "string", example: "123456" },
                        },
                    },
                    LoginRequest: {
                        type: "object",
                        required: ["email", "password"],
                        properties: {
                            email: { type: "string", format: "email", example: "nick@test.com" },
                            password: { type: "string", example: "123456" },
                        },
                    },
                    AuthPayload: {
                        type: "object",
                        properties: {
                            userId: { type: "string" },
                            email: { type: "string" },
                            isAdmin: { type: "boolean" },
                        },
                    },
                    AuthResponse: {
                        type: "object",
                        properties: {
                            message: { type: "string" },
                            user: { $ref: "#/components/schemas/AuthPayload" },
                            token: { type: "string" },
                        },
                    },
                    UserResponse: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            username: { type: "string" },
                            email: { type: "string" },
                            isAdmin: { type: "boolean" },
                        },
                    },
                    EventRequest: {
                        type: "object",
                        required: ["title", "date"],
                        properties: {
                            title: { type: "string", example: "CF Meetup" },
                            description: { type: "string" },
                            date: { type: "string", format: "date-time", example: "2025-12-31T18:00:00.000Z" },
                            location: { type: "string", example: "Athens" },
                            isPublic: { type: "boolean", example: true },
                        },
                    },
                    EventUpdateRequest: {
                        allOf: [{ $ref: "#/components/schemas/EventRequest" }],
                        required: [], // όλα optional στο update
                    },
                    EventResponse: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            title: { type: "string" },
                            description: { type: "string" },
                            date: { type: "string", format: "date-time" },
                            location: { type: "string" },
                            isPublic: { type: "boolean" },
                            createdBy: { type: "string" },
                            attendeesCount: { type: "integer" },
                            isAttending: { type: "boolean" },
                        },
                    },
                    PaginatedEvents: {
                        type: "object",
                        properties: {
                            items: {
                                type: "array",
                                items: {$ref: "#/components/schemas/EventResponse"},
                            },
                            total: {type: "integer", example: 1},
                            page: {type: "integer", example: 1},
                            limit: {type: "integer", example: 10},
                        },
                    },
                },
            },
        },
        apis: ["./src/routes/*.ts"],
    };

    const specs = swaggerJsdoc(options);
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
};