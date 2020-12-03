import { IsEmail, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, InsertResult, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import bcrypt = require('bcrypt');

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    name: string;

    @IsString()
    password: string;

    @Column({ select: false })
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

    static async updateUser(id: number, user: User) {
        const updateObject: { [k: string]: any } = {};
        updateObject.email = user.email;
        updateObject.phone = user.phone;
        if (user.password) {
            updateObject.hashed_password = await bcrypt.hash(user.password, 10);
        }
        return this.getRepository().update(id, updateObject);
    }
}