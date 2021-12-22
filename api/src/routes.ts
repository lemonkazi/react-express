import {
  userHandler,
  authHandler
} from './index';

export enum RouteMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Route {
  endpoint: string;
  handler: (event: any, context: any) => void;
  method: RouteMethod;
}

export const routes: Route[] = [
  {
      endpoint: '/apis/v1/users',
      handler: userHandler,
      method: RouteMethod.GET,
  },
  {
      endpoint: '/apis/v1/users',
      handler: userHandler,
      method: RouteMethod.POST,
  },
  {
      endpoint: '/apis/v1/users/:userId',
      handler: userHandler,
      method: RouteMethod.PUT,
  },
  {
      endpoint: '/apis/v1/users/:userId',
      handler: userHandler,
      method: RouteMethod.DELETE,
  },
  {
      endpoint: '/apis/v1/login',
      handler: authHandler,
      method: RouteMethod.POST,
  },
];
