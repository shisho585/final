import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IsEmail, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { User } from './user.entity';
import { Ticket } from "./ticket.entity";
import { Flight } from "./flight.entity";

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly order_no: number;

    @Column()
    @IsEmail()
    user_email: string;

    @Column({ nullable: true })
    @IsNumber()
    @IsOptional()
    seats_chosen: number;

    @Column()
    @IsNumber()
    price: number;

    @ManyToOne('User', { onDelete: "CASCADE", onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
    user: User;

    @OneToMany('Ticket', 'order', { cascade: true })
    @ValidateNested({ each: true })
    @Type(() => Ticket)
    tickets: Ticket[];

    static async saveOrder(order: Order) {
        console.log(order);
        
        const flight = await Flight.findOneWithRelations(order.tickets[0].flight_number);
        order.tickets.filter(ticket => ticket.seat != undefined && ticket.seat != null)
            .forEach(ticket => {
                ticket.paydSeat = true;
                flight.tickets.push(ticket)
            });

        order.tickets.filter(ticket => ticket.seat == undefined || ticket.seat == null)
            .forEach(ticket => {
                ticket.paydSeat = false;
                for (let rowIndex = 0; rowIndex < flight.plain.number_of_rows; rowIndex++) {
                    if (ticket.seat == undefined || ticket.seat == null) {
                        for (let seatIndex = 0; seatIndex < flight.plain.seats_to_row; seatIndex++) {
                            if (!flight.tickets.some(oldTicket => oldTicket.row == rowIndex && oldTicket.seat == seatIndex)) {
                                ticket.row = rowIndex;
                                ticket.seat = seatIndex;
                                flight.tickets.push(ticket);
                                break;
                            }
                        }
                    }
                }
            })
        order = await this.getRepository().save(order);
        return Order.findOne(order.order_no, { relations: ['tickets', 'tickets.passenger'] })
    }
}
