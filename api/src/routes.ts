import {
  userHandler,
  authHandler
} from './index';

export enum RouteMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  AUTH = 'AUTH',
}

export interface Route {
  endpoint: string;
  handler: (event: any, context: any) => void;
  method: RouteMethod;
  action: string | null;
  checkRole?: boolean;
  checkAuth?: boolean;
}

export const routes: Route[] = [
  {
      endpoint: '/apis/v1/users',
      handler: userHandler,
      method: RouteMethod.GET,
      action: null,
      checkRole: true,
      checkAuth: true
  },
  {
    endpoint: '/apis/v1/users/:userId',
    handler: userHandler,
    method: RouteMethod.GET,
    action: null
  },
  {
      endpoint: '/apis/v1/users',
      handler: userHandler,
      method: RouteMethod.POST,
      action: null
  },
  {
      endpoint: '/apis/v1/users/:userId',
      handler: userHandler,
      method: RouteMethod.PUT,
      action: null
  },
  {
      endpoint: '/apis/v1/users/:userId',
      handler: userHandler,
      method: RouteMethod.DELETE,
      action: null
  },
  {
      endpoint: '/apis/v1/login',
      handler: authHandler,
      method: RouteMethod.AUTH,
      action: 'login',
  },
];
