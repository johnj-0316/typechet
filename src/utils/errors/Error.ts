import { ValidationError } from "express-validator";

export { ClientError, APIError, ServerError };

// errors for 400 level
// adding statusCode property for readability

class ClientError extends Error {
    statusCode: number; //400;
    details: void | string | ValidationError | ValidationError[];

    constructor(message: string, statusCode: number, details?: string | ValidationError | ValidationError[]) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

class APIError extends Error {
    statusCode: number; //401-404;
    details: void | string | ValidationError | ValidationError[];

    constructor(message: string, statusCode: number, details?: string | ValidationError | ValidationError[]) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

// errors for 500

class ServerError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}