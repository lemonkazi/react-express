'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv = require('dotenv');
dotenv.config();
const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DbName,
    username: process.env.MasterUsername,
    password: process.env.MasterUserPassword,
    nodeEnv: process.env.NODE_ENV,
    userPoolId: process.env.AWS_USER_POOL_ID,
};
exports.default = dbConfig;
//# sourceMappingURL=config.js.map
