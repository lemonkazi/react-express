import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { Route, RouteMethod, routes } from './routes';
//import event from '../utility/testing-setup/utils/testEvent';
import "reflect-metadata";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const bodyParser = require('body-parser');



var app = express();
var event = require('events');
const context: any = {
    awsRequestId: 0,
};



let PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });




// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(cors());
// function defaultContentTypeMiddleware (req:any, res:any, next:any) {
//     console.log('ddddddds');
//     console.log(req.body);
//     //req.headers['content-type'] = req.headers['content-type'] || 'application/json';
//     //next();
//   }
  
// app.use(defaultContentTypeMiddleware);
//app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));



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


/** Require multer */
const multer = require('multer');

/** Decode Form URL Encoded data */
app.use(express.urlencoded());

/** Decode JSON data */
app.use(express.json());
app.use(multer({dest:'./uploads/'}).any());

const getRequest = (route: Route) => {
    app.get(route.endpoint, async (req: any, res: any) => {
        console.log('GET ', req.path);
        console.log('Query params =  ', req.query);
        console.log('Path params =  ', req.params);
        event.httpMethod = route.method;
        event.pathParameters = req.params;
        event.queryStringParameters = req.query;
        event.headers = req.headers;
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
        const response: any = await route.handler(event, context);
        res.send(response.body);
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
