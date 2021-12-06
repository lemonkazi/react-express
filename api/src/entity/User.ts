import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Assignee } from './Assignee';
// import { Organization } from './Organization';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'superAdmin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public email?: string;

    // @Column({ name: 'default_restaurant' })
    // public defaultRestaurant?: number;

    @Column()
    public role?: UserRole;

    @Column()
    public username?: string;

    // @Column()
    // public department?: string;

    // @ManyToOne((type) => Organization, (organization) => organization.user, {
    //     nullable: true,
    //     eager: true,
    // })
    // @JoinColumn({ name: 'organization_id' })
    // public organization?: Organization;

    // @OneToMany((type) => Assignee, (assignee) => assignee.user, {
    //     nullable: true,
    //     eager: true,
    // })
    // @JoinColumn({ name: 'assignee_id' })
    // public assignees?: Assignee[];
}
