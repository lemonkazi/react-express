import { APIGatewayEvent, Context } from 'aws-lambda';
import BaseHandlerRDS from '../BaseHandler';
import UserService from '../../services/user/UserService';

const validationSchemePost = require('../../../assets/validationSchemes/user/post.json');
const validationSchemePut = require('../../../assets/validationSchemes/user/put.json');
const validationSchemeGet = require('../../../assets/validationSchemes/user/get.json');

export default class AuthHandler extends BaseHandlerRDS<UserService> {
    constructor(event: APIGatewayEvent, context: Context) {
        super(
            validationSchemeGet,
            validationSchemePost,
            validationSchemePut,
            true,
            true,
            true,
            true,
            event,
            context,
            new UserService(),
        );
    }
}
