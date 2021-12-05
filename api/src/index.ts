import UserHandler from './handler/user/UserHandler';
import * as Response from './lib/response/response';


export const userHandler = async (event: any, context: any) => {
    try {
        const handlerObj = new UserHandler(event, context);
        return await handlerObj.handler();
    } catch (e:any) {
        return new Response.GeneralErrorResponse(500, e.message, '').create();
    }
};
