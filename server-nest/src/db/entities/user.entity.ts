import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Matches, IsNumberString } from "class-validator";
import { Ticket } from "./ticket.entity";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    @IsNumberString()
    passport_id: number;

    @Column()
    @Matches(/^[\u0590-\u05fe\s]*$/)
    hebrew_name: string;

    @Column()
    @Matches(/^[a-zA-Z\s]*$/)
    english_name: string;

    @OneToMany('Ticket', 'user')
    tickets: Ticket[]
}