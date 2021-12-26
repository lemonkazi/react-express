import { DateTime } from 'luxon';
import { EntityManager } from 'typeorm';
import ConnectionManager from '../connectionManager';
import UserDao from '../dao/user/UserDao';
import { UserRole } from '../entity/User';

export default abstract class BaseService {
    public async transaction<T>(func: (manager: EntityManager) => Promise<T>): Promise<T> {
        const connection = await this.conn();
        return await connection.transaction(async (manager) => {
            return func(manager);
        });
    }

    private conn = async () => ConnectionManager.createConnection();
    public formatDay(date: string) {
        return DateTime.fromISO(date).toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    }
    public formatMonth(date: string) {
        return DateTime.fromISO(date).toFormat('yyyy-MM');
    }
    public async isSuperAdmin(email: string, manager: EntityManager) {
        const userDao = new UserDao(manager);
        const user = await userDao.findByEmail(email);
        return user && user.role === 'ADMINISTRATOR';
    }
}
