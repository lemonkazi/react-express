import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import UserHandler from './handler/user/UserHandler';
import AuthHandler from './handler/auth/AuthHandler';
import * as Response from './lib/response/response';


export const userHandler = async (event: APIGatewayEvent, context: Context) => {
    try {
        const handlerObj = new UserHandler(event, context);
        return await handlerObj.handler();
    } catch (e:any) {
        return new Response.GeneralErrorResponse(500, e.message, '').create();
    }
};


export const authHandler = async (event: APIGatewayEvent, context: Context) => {
    try {
        const handlerObj = new AuthHandler(event, context);
        return await handlerObj.handler();
    } catch (e:any) {
        return new Response.GeneralErrorResponse(500, 'handle error' + e.message, '').create();
    }
};
