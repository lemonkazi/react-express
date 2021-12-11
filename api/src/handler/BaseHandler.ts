import { APIGatewayEvent } from 'aws-lambda';
import { ObjectLiteral } from 'typeorm';
import Request from '../lib/request/request';
import * as Response from '../lib/response/response';
import { ApiResponse } from '../lib/response/response';
import { ResourceNotFoundError, UnauthorizedError } from '../lib/utils/customErrors';
import { Logger, LogLevel } from '../logger';

// postgres returns number type as string, so change it to return floats.
// const types = require('pg').types;
// types.setTypeParser(1700, function (val: any) {
//     return parseFloat(val);
// });

const logger = new Logger();

export default abstract class BaseHandlerRDS<Service> {
    protected validationSchemeGet: string | null;
    protected validationSchemePost: string | null;
    protected validationSchemePut: string | null;
    protected doPost: boolean;
    protected doPut: boolean;
    protected doGet: boolean;
    protected doDelete: boolean;
    protected event: APIGatewayEvent;
    protected context: any; // Context,
    protected service: any;
    protected resourcePath: string;
    protected emailUser: string = '';

    constructor(
        validationSchemeGet: string | null,
        validationSchemePost: string | null,
        validationSchemePut: string | null,
        doPost: boolean,
        doPut: boolean,
        doGet: boolean,
        doDelete: boolean,
        event: APIGatewayEvent,
        context: any, // Context,
        service: Service,
    ) {
        this.validationSchemeGet = validationSchemeGet;
        this.validationSchemePost = validationSchemePost;
        this.validationSchemePut = validationSchemePut;
        this.doPost = doPost;
        this.doPut = doPut;
        this.doGet = doGet;
        this.doDelete = doDelete;
        this.event = event;
        this.context = context;
        this.service = service;
        this.resourcePath = event.resource;
        logger.log(LogLevel.log, JSON.stringify(this.context));
        logger.log(LogLevel.log, JSON.stringify(this.event));
        this.emailUser = this.event.requestContext?.authorizer?.claims.email;
    }

    public async handler(): Promise<ApiResponse> {
        switch (this.event.httpMethod) {
            case 'GET':
                if (!this.doGet) return this.unhandledMethod();
                return await this._get();
            case 'POST':
                if (!this.doPost) return this.unhandledMethod();
                
                console.log(this.event);
                //return await this._post();
            case 'PUT':
                if (!this.doPut) return this.unhandledMethod();
                return await this._put();
            case 'DELETE':
                if (!this.doDelete) return this.unhandledMethod();
                return await this._delete();
            default:
                return Promise.reject(
                    new Response.GeneralErrorResponse(
                        501,
                        'Unsupported HTTP method(' + this.event.httpMethod + ')',
                        this.context.awsRequestId,
                    ).create(),
                );
        }
    }
    protected async _get(): Promise<ApiResponse> {
        let response;

        const eventQueryParams = this.event.queryStringParameters
            ? this.event.queryStringParameters
            : {};

        const queryParams: ObjectLiteral = new Request(
            eventQueryParams,
            this.validationSchemeGet!,
        ).validate();

        try {
            const id = this.event.pathParameters ? this.event.pathParameters.id : false;
            const result = await (id
                ? this.service._getById(id, this.emailUser)
                : this.service._get(queryParams, this.emailUser));
            if (result === null || result === undefined) {
                response = new Response.GetResponse({}).create();
            } else {
                response = new Response.GetResponse(result).create();
            }
        } catch (error:any) {
            return this.buildError(error);
        }

        return response;
    }

    protected async _post(): Promise<ApiResponse> {
        let response;
        try {
            let eventBody;
            if (typeof this.event.body === 'object') {
                eventBody = this.event.body;
            } else {
                eventBody = JSON.parse(this.event.body);
            }
            const body: ObjectLiteral = new Request(
                eventBody,
                this.validationSchemePost!,
            ).validate();
            const result = await this.service._post(body, this.emailUser);
            response = new Response.PostResponse(result, this.resourcePath).create();
        } catch (error:any) {
            return this.buildError(error);
        }

        return response;
    }

    protected async _put(): Promise<ApiResponse> {
        let response;
        try {
            let eventBody;
            if (typeof this.event.body === 'object') {
                eventBody = this.event.body;
            } else {
                eventBody = JSON.parse(this.event.body);
            }
            const body: ObjectLiteral = new Request(
                eventBody,
                this.validationSchemePut!,
            ).validate();
            const pathParameters = this.event.pathParameters;
            const result = await this.service._put(body, pathParameters, this.emailUser);
            response = new Response.PostResponse(result, this.resourcePath).create();
        } catch (error:any) {
            return this.buildError(error);
        }

        return response;
    }

    protected async _delete(): Promise<ApiResponse> {
        let response;

        try {
            const pathParameters = this.event.pathParameters!;
            const result = await this.service._delete(pathParameters, this.emailUser);
            response = new Response.DeleteResponse().create();
        } catch (error:any) {
            return this.buildError(error);
        }

        return response;
    }

    protected unhandledMethod(): ApiResponse {
        return new Response.GeneralErrorResponse(
            501,
            'Unsupported HTTP method(' + this.event.httpMethod + ')',
            this.context.awsRequestId,
        ).create();
    }

    protected buildError(e: Error): ApiResponse {
        if (e instanceof ResourceNotFoundError) {
            return new Response.GeneralErrorResponse(
                404,
                e.message,
                this.context.awsRequestId,
            ).create();
        } else if (e instanceof UnauthorizedError) {
            return new Response.GeneralErrorResponse(
                401,
                e.message,
                this.context.awsRequestId,
            ).create();
        } else {
            return new Response.GeneralErrorResponse(
                500,
                e.message,
                this.context.awsRequestId,
            ).create();
        }
    }
}
