import {
    Entity,
    Column,
    Index,
    BeforeInsert,
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn
  } from "typeorm";


import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer";
const bcrypt = require('bcrypt');

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

    @Index()
    @IsEmail()
    @Column({ unique: true })
    public email?: string;

    // @Column({ name: 'default_restaurant' })
    // public defaultRestaurant?: number;

    @Column()
    public role?: UserRole;
    
    

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

    @Index()
    @Length(3, 200)
    @Column({ unique: true })
    public username?: string;
  
    @Exclude()
    @Length(6, 200)
    @Column()
    public password?: string;
  
    // @OneToMany(() => Post, post => post.user)
    // posts: Post[];
  
    @BeforeInsert()
    async hashedPassword() {
      this.password = await bcrypt.hash(this.password, 6);
    }
}
