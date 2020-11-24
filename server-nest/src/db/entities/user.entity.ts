import { IsEmail, IsNumber, IsString } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Passenger } from "./passenger.entity";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    @IsString()
    name: string;

    @IsString()
    password: string;

    @Column()
    hashed_password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNumber()
    phone: number;

    @OneToMany('Passenger', 'cantact_user')
    passengers: Passenger[];

}