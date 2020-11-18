import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Plain } from "./plain.entity";
import { Ticket } from "./ticket.entity";
import { IsNumberString, MaxLength, IsOptional, IsDateString, IsAlpha, IsString } from "class-validator";

@Entity('flights')
export class Flight extends BaseEntity {
    @PrimaryColumn()
    @IsNumberString()
    number: number;

    @Column()
    @IsDateString()
    departure: Date;

    @Column({ nullable: true }/*TODO nullable*/)
    @IsDateString()
    @IsOptional()
    landing: Date;

    @Column()
    @IsAlpha()
    from_country: string;

    @Column()
    @IsAlpha()
    @MaxLength(3)
    from_terminal: string;

    @Column()
    @IsAlpha()
    to_country: string;

    @Column()
    @IsAlpha()
    @MaxLength(3)
    to_terminal: string;

    @Column({ nullable: true })
    @IsString()
    plain_type: string;

    @Column()
    @IsNumberString()
    price: number;

    @ManyToOne('Plain')
    @JoinColumn({ name: 'plain_type' })
    plain: Plain;

    @OneToMany('Ticket', 'flight')
    tickets: Ticket[]

    distance: number;

}