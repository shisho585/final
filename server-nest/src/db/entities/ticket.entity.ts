import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Unique } from 'typeorm';
import { IsString, ValidateNested, IsNumber, IsOptional, validateOrReject } from 'class-validator';
import { Passenger } from './passenger.entity';
import { Flight } from './flight.entity';
import { BadRequestException } from '@nestjs/common';
import { Order } from './order.entity';
import { Type } from 'class-transformer';

@Entity('tickets')
@Unique('same seat', ['flight_number', 'row', 'seat'])
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly ticket_no: number;

    @Column()
    @IsNumber()
    @IsOptional()
    passenger_passport: number;

    @Column()
    @IsString()
    flight_number: string;

    @Column()
    @IsNumber()
    @IsOptional()
    order_number: number;

    @Column()
    @IsNumber()
    @IsOptional()
    row: number;

    @Column()
    @IsNumber()
    @IsOptional()
    seat: number;

    @ManyToOne('Passenger', { cascade: true })
    @JoinColumn({ name: 'passenger_passport' })
    @ValidateNested()
    @Type(() => Passenger)
    passenger: Passenger;

    @ManyToOne('Flight')
    @JoinColumn({ name: 'flight_number' })
    flight: Flight;

    @ManyToOne('Order')
    @JoinColumn({ name: 'order_number' })
    order: Order;

    // static async save(ticketsToAdd: Ticket[]) {
    //     try {
    //         await Promise.all(
    //             ticketsToAdd.map(ticket => validateOrReject(Ticket.create(ticket)))
    //         )
    //     } catch (error) {
    //         if (Array.isArray(error)) {
    //             throw new BadRequestException(
    //                 error.map(err => {
    //                     if (err.children.length > 0)
    //                         return err.children.map(cErr => Object.values(cErr.constraints)[0])
    //                     return Object.values(err.constraints)[0]
    //                 })
    //             )
    //         } else {
    //             throw new Error(error);
    //         }
    //     }
    //     const flight = await Flight.findOne(
    //         ticketsToAdd[0].flight_number,
    //         { relations: ['plain', 'tickets'] }
    //     );
    //     ticketsToAdd.filter(ticket => ticket.seat != undefined && ticket.seat != null)
    //         .forEach(ticket => flight.tickets.push(ticket));

    //     ticketsToAdd.filter(ticket => ticket.seat == undefined || ticket.seat == null)
    //         .forEach(ticket => {
    //             for (let rowIndex = 0; rowIndex < flight.plain.number_of_rows; rowIndex++) {
    //                 if (ticket.seat == undefined || ticket.seat == null) {
    //                     for (let seatIndex = 0; seatIndex < flight.plain.seats_to_row; seatIndex++) {
    //                         if (!flight.tickets.some(oldTicket => oldTicket.row == rowIndex && oldTicket.seat == seatIndex)) {
    //                             ticket.row = rowIndex;
    //                             ticket.seat = seatIndex;
    //                             flight.tickets.push(ticket);
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //         })
    //     return this.getRepository().save(ticketsToAdd);
    // }
}
