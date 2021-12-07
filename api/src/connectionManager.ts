import { BaseEntity, Connection, createConnection } from 'typeorm';
import dbConfig from './config';
import { User } from './entity/User';

export default class ConnectionManager {
    public static getConnection() {
        return this.connection;
    }

    public static async createConnection() {
        if (!this.connection) {
            try {
                this.connection = await createConnection({
                    type: 'mysql',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.database,
                    entities: [
                        User,
                        
                    ],
                    synchronize: false,
                    logging: true,
                });
            } catch (e) {
                return Promise.reject({
                    message: `Couldnt connect to database: ${e} with params
                ${JSON.stringify({
                    port: dbConfig.port,
                    username: dbConfig.username,
                    database: dbConfig.database,
                })}`,
                });
            }
        }
        BaseEntity.useConnection(this.connection);
        return this.connection;
    }

    private static connection: Connection;
}
