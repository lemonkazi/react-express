class DomainError extends Error {
    protected data: any;

    constructor(message: string) {
        super(message);
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ResourceNotFoundError extends DomainError {
    constructor(
        resource: string,
        query: {
            [key: string]: any;
        },
    ) {
        super(`Resource ${resource} was not found.`);
        this.data = { resource, query };
    }
}

export class UnauthorizedError extends DomainError {
    constructor(resource: string, message?: string) {
        super(message ? message : `User unauthorized to access resource ${resource}`);
        this.data = { resource };
    }
}
