import { Logger, LogLevel } from '../../logger';

export interface ApiResponse {
    statusCode: number;
    body: string;
    headers: any;
}

/** Base Model of Lambda Response */
export class BaseResponse {
    /** Create CORS Header */
    protected static createCorsHeader() {
        return {
            'Access-Control-Allow-Origin': '*',
        };
    }

    private readonly statusCode: number;
    private readonly headers: object;
    private readonly bodyObject: object;

    constructor(statusCode: number, headers: {}, bodyObject: {}) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.bodyObject = bodyObject;
    }

    /** Create Lambda response object */
    public create(): ApiResponse {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.bodyObject),
            headers: this.headers,
        };
    }
}

/** Response Model for General Errors */
// tslint:disable-next-line: max-classes-per-file
export class GeneralErrorResponse extends BaseResponse {
    constructor(statusCode: number, errorMessage: string, awsRequestId: string) {
        super(statusCode, BaseResponse.createCorsHeader(), {
            message: errorMessage,
        });
        //const logger = new Logger();
        //logger.log(LogLevel.error, errorMessage);
    }
}

/** Response Model for POST method */
// tslint:disable-next-line: max-classes-per-file
export class PostResponse extends BaseResponse {
    public static createHeader(resourcePath: string) {
        const header = {
            'Access-Control-Allow-Origin': '*',
            Location: resourcePath,
        };
        return header;
    }

    constructor(bodyObject: object, resourcePath: string) {
        super(200, PostResponse.createHeader(resourcePath), bodyObject);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class GetResponse extends BaseResponse {
    constructor(bodyObject: object) {
        super(200, BaseResponse.createCorsHeader(), bodyObject);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteResponse extends BaseResponse {
    constructor(bodyObject: object) {
        super(204, BaseResponse.createCorsHeader(), bodyObject);
    }
}
