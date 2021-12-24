import { response, Response } from 'express';

(response as any).customSuccess = function (httpStatusCode: number, message: string, data: any,success: false): Response {
  return this.status(httpStatusCode).json({ message,success, data });
  
};
//export default Response;