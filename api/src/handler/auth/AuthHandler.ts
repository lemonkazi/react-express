import { APIGatewayEvent, Context } from 'aws-lambda';
import { ObjectLiteral } from 'typeorm';
import Request from '../../lib/request/request';
import * as Response from '../../lib/response/response';
import { ApiResponse } from '../../lib/response/response';
import { ResourceNotFoundError, UnauthorizedError } from '../../lib/utils/customErrors';
import { Logger, LogLevel } from '../../logger';

import AuthService from '../../services/auth/AuthService';
const logger = new Logger();
const validationSchemeLogin = require('../../../assets/validationSchemes/auth/login.json');
// const validationSchemePut = require('../../../assets/validationSchemes/user/put.json');
// const validationSchemeGet = require('../../../assets/validationSchemes/user/get.json');

export default class AuthHandler<AuthService> {
    protected event: APIGatewayEvent;
    protected context: any; // Context,
    protected service: any;
    protected validationSchemeLogin: string | null;
    protected resourcePath: string;
    protected emailUser: string = '';


    constructor(event: APIGatewayEvent, context: Context) {
        this.event = event;
        this.context = context;
        this.service = new AuthService();
        this.validationSchemeLogin = validationSchemeLogin;
        this.resourcePath = event.resource;
        this.emailUser = this.event.requestContext?.authorizer?.claims.email;

        logger.log(LogLevel.log, JSON.stringify(this.context));
        //logger.log(LogLevel.log, JSON.stringify(this.event));
    }

    public async handler(): Promise<ApiResponse> {
        switch (this.event.httpMethod) {
            case 'AUTH':
                if (this.context.action && this.context.action !=null) {
                    switch (this.context.action) {
                        case 'login':
                            return await this._login();
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


    protected async _login(): Promise<ApiResponse> {
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
                this.validationSchemeLogin!,
            ).validate();
            const result = await this.service._login(body, this.emailUser);
            response = new Response.PostResponse(result, this.resourcePath).create();
        } catch (error:any) {
            return this.buildError(error);
        }
        
        return response;
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
