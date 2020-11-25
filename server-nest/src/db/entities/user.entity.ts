import { IsEmail, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Ticket } from "./ticket.entity";

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

    @Column({ nullable: true })
    hashed_password: string;

    @Column()
    @IsNumber()
    phone: number;

    @OneToMany('Ticket', 'cantact_user')
    tickets: Ticket[];

}