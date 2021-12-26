import { Request, response, Response, NextFunction,ErrorRequestHandler } from 'express';

import { Route, RouteMethod, routes } from './routes';
import { Logger, LogLevel } from './logger';

import './utils/response/customSuccess';
//import event from '../utility/testing-setup/utils/testEvent';
import "reflect-metadata";

var express = require("express");
//var logger = require("morgan");
var logger = new Logger();
var cors = require("cors");



var app = express();
//var event = require('events');

// @ts-ignore
const createEvent = require('aws-event-mocks');

const event = createEvent({
    template: 'aws:apiGateway',
    merge: {
        body: {},
    },
    pathParameters: {},
});
event.requestContext = {
    authorizer: {
        claims: {
            email: 'admin@test.jp',
        },
        checkRole:{
    
            checkRole: false,
            
        },
        checkAuth : {
        
            checkAuth: false,
            
        }
    }
};


const context: any = {
    awsRequestId: 0,
};



let PORT = process.env.PORT || 9000;

app.use(cors());


//app.use(logger("dev"));

/** Require multer */
const multer = require('multer');

/** Decode Form URL Encoded data */
app.use(express.urlencoded({extended: true}));

/** Decode JSON data */
app.use(express.json());
app.use(multer({dest:'./uploads/'}).any());



// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var testAPIRouter = require("./routes/testAPI");

// var token = require("./routes/token");
// var tokenVerify = require("./routes/verify");
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/testAPI", testAPIRouter);
// app.use("/token", token);
// app.use("/token-verify", tokenVerify);




// // catch 404 and forward to error handler
// app.use(function(req: Request, res: Response, next: NextFunction) {
//     next(createError(404));
// });


// error handler
app.use(function(err, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
} as ErrorRequestHandler);


const getRequest = (route: Route) => {
    
    app.get(route.endpoint, async (req: Request, res: Response, next: NextFunction) => {
        console.log('GET ', req.path);
        console.log('Query params =  ', req.query);
        console.log('Path params =  ', req.params);
        event.httpMethod = route.method;
        event.pathParameters = req.params;
        event.queryStringParameters = req.query;
        event.headers = req.headers; 
        event.requestContext.authorizer.checkAuth.checkAuth = route.checkAuth;
        event.requestContext.authorizer.checkAuth.checkRole = route.checkRole;
        //context.request = req;
        //context.response = res;
        // event.checkRole = route.checkRole;
        // event.checkAuth = route.checkAuth;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

const postRequest = (route: Route) => {
    app.post(route.endpoint, async (req: any, res: any) => {
        console.log('POST ', route.endpoint);
        console.log('post body = ', event.body);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.requestContext.authorizer.checkAuth.checkAuth = route.checkAuth;
        event.requestContext.authorizer.checkAuth.checkRole = route.checkRole;
        if (typeof req.body == 'object') {
            event.body = JSON.stringify(req.body);
        } else {
            event.body = req.body;
        }
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};


const putRequest = (route: Route) => {
    app.put(route.endpoint, async (req: any, res: any) => {
        console.log('PUT ', req.path);
        console.log('PUT body =  ', req.body);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.pathParameters = req.params;
        const body = req.body;
        event.body = body;
        event.requestContext.authorizer.checkAuth.checkAuth = route.checkAuth;
        event.requestContext.authorizer.checkAuth.checkRole = route.checkRole;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};
const deleteRequest = (route: Route) => {
    app.delete(route.endpoint, async (req: any, res: any) => {
        console.log('DELETE ', route.endpoint);
        event.httpMethod = route.method;
        event.headers = req.headers;
        event.pathParameters = req.params;
        event.requestContext.authorizer.checkAuth.checkAuth = route.checkAuth;
        event.requestContext.authorizer.checkAuth.checkRole = route.checkRole;
        const response: any = await route.handler(event, context);
        res.send(response.body);
    });
};

const authRequest = (route: Route) => {
    app.post(route.endpoint, async (req: Request, res: Response, next: NextFunction) => {
        console.log('AUTH ', route.endpoint);
        console.log('post body = ', event.body);
        event.httpMethod = route.method;
        context.action = route.action;
        
        event.headers = req.headers;
        if (typeof req.body == 'object') {
            event.body = JSON.stringify(req.body);
        } else {
            event.body = req.body;
        }
        const response: any = await route.handler(event, context);
        var result = JSON.parse(response.body);
        var message='';
        var success=true;
        if (result.constructor.name == "Array" || result.constructor.name == "Object") {
            
            message = result.message;
            success = Boolean(result.success);
            delete result.success;
            delete result.message;
            result = result;
        } 
        (res as any).customSuccess(response.statusCode, message, result,success);
    });
};


routes.forEach((route) => {
    switch (route.method) {
        case RouteMethod.GET:
            getRequest(route);
            break;
        case RouteMethod.POST:
            postRequest(route);
            break;
        case RouteMethod.PUT:
            putRequest(route);
            break;
        case RouteMethod.DELETE:
            deleteRequest(route);
            break;
        case RouteMethod.AUTH:
            authRequest(route);
            break;
        default:
            console.log('error, route method invalid');
            break;
    }
});

app.listen(PORT, () => {
    console.log(`Timezones by location application is running on port ${PORT}.`);
    console.log(`Endpoints: `);
    routes.forEach((route) => console.log(`${route.method} ${route.endpoint}`));
});


module.exports = app;
