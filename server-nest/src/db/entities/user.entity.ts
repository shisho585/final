import { IsEmail, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, InsertResult } from "typeorm";
import { Order } from "./order.entity";
import bcrypt = require('bcrypt');

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    name: string;

    @IsString()
    password: string;

    @Column({ nullable: true, select: false })
    hashed_password: string;

    @Column()
    @IsNumber()
    phone: number;

    @Column({ default: 'user' })
    role: string;

    @OneToMany('Order', 'user')
    orders: Order[];

    static async insertUser(user: User): Promise<InsertResult> {
        user.hashed_password = await bcrypt.hash(user.password, 10);
        return this.getRepository().insert(user);
    }

}