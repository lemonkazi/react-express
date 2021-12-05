import * as dotenv from 'dotenv';
dotenv.config();

interface DbConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    nodeEnv: string;
    userPoolId: string;
}
console.log('env variables = ', process.env);

const dbConfig: DbConfig = {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    database: process.env.DbName!,
    username: process.env.MasterUsername!,
    password: process.env.MasterUserPassword!,
    nodeEnv: process.env.NODE_ENV!,
    userPoolId: process.env.AWS_USER_POOL_ID!,
};
export default dbConfig;
