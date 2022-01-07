import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  JoinColumn, 
  ManyToOne, 
  OneToMany, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn
} from "typeorm";


import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer";

const saltRounds = 6;

@Entity('user_oauth_token_access')
export class UserOauthAccessToken {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public token?: string;

  @Column({ name: 'user_id' })
  public userId?: number;


  

  @Column()
  public expired?: string;

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



  @Column()
  @CreateDateColumn()
  public created_at?: Date;

  @Column()
  @UpdateDateColumn()
  public modified_at?: Date;

  // @OneToMany(() => Post, post => post.user)
  // posts: Post[];

 
}
