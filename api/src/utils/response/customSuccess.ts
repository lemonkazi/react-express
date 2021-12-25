import { response, Response } from 'express';

(response as any).customSuccess = function (httpStatusCode: number, message: string, body: any,success: false): Response {
  return this.status(httpStatusCode).json({ message,success, body });
  
};
//export default Response;