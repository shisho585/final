import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MaxLength, IsAlpha, IsString, IsDate, IsNumber, Matches, } from 'class-validator';
import { Type } from 'class-transformer';
import { Plain } from './plain.entity';
import { Ticket } from './ticket.entity';


@Entity('flights')
export class Flight extends BaseEntity {
    @PrimaryColumn()
    @Matches(/^[0-9a-zA-Z\s]*$/)
    number: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    departure: Date;

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

    @Column()
    @IsNumber()
    distance: number;

    @Column({ nullable: true })
    @IsString()
    plain_type: string;

    @Column()
    @IsNumber()
    price: number;

    @ManyToOne('Plain')
    @JoinColumn({ name: 'plain_type' })
    plain: Plain;

    @OneToMany('Ticket', 'flight')
    tickets: Ticket[];
}
