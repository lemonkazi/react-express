# React_Express_App_exercise
- This repository has the code with React FrontEnd, a Node/Express/typescript BackEnd and connect them together.
- This repository can also be used as a starting point (boilerplate), if you whant to create your own React/Express app.
.

## About the app
Actually, there are two separated apps. The Client which serves the FrontEnd (using React), and the API (in Node/Express).

## How to run the API
1. In your terminal, navigate to the `api` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm dev` to start the app.
4. Setup configuration:

```sh
cp .env.example .env
```
5. Create an MySQL database. You can also use another database (Postgres), simply update your configuration accordingly in `.env`.

6. Run database migrations:

```sh
npm run migration:run
```
7. Run database seeder:

```sh
npm run seed:run
```
8. 
You're ready to go! login with api: http://localhost:9000/apis/v1/login

-   **Username:** admin@filamentadmin.com
-   **Password:** password


## How to run the Client
1. In another terminal, navigate to the `client` directory.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the app

## Check if they are connected
1. With the two apps running, open your browser in http://localhost:3000/.
2. If you see a webpage saying `Welcome to React`, it means the FrontEnd is working.
3. If the same webpage has the phrase `API is working properly`, it means the API is working.
4. Enjoy!
