import { ConnectionOptions } from 'typeorm';
const seeds = process.env.NODE_ENV == 'local' ? 'src/seeds/**/*.ts' : '';

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.MasterUsername,
  password: process.env.MasterUserPassword,
  database: process.env.DbName,
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/seeds/**/*.ts'],
  cli: {
    migrationsDir: 'src/seeds',
  }
};