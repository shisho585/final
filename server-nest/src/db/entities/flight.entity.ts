import { Entity, BaseEntity, Column, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength, IsAlpha, IsString, IsDate, IsNumber, Matches, } from 'class-validator';
import { Type } from 'class-transformer';
import { Plain } from './plain.entity';
import { Ticket } from './ticket.entity';
import { BadRequestException } from '@nestjs/common';

@Entity('flights')
export class Flight extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    @Matches(/^[0-9a-zA-Z\s]*$/)
    flight_no: string;

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

    @ManyToOne('Plain', { onDelete: "CASCADE", onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'plain_type', referencedColumnName: 'type' })
    plain: Plain;

    @OneToMany('Ticket', 'flight')
    tickets: Ticket[];

    freeSeats: number;

    static async findOneWithRelations(flightNumber: string) {
        let flight: Flight;
        try {
            flight = await this.getRepository().findOneOrFail({ flight_no: flightNumber }, { relations: ['plain', 'tickets'] });
        } catch (error) {
            throw new BadRequestException('No such flight');
        }
        const seats = flight.plain.number_of_rows * flight.plain.seats_to_row;
        flight.freeSeats = seats - flight.tickets.length;
        return flight;
    }
}
