import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, } from 'typeorm';
import { IsString, IsNumber, IsOptional, IsNumberString, } from 'class-validator';
import { User } from './user.entity';
import { Flight } from './flight.entity';

@Entity('tickets')
export class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly ticket_no: number;

    @Column()
    @IsNumberString()
    user_id: number;

    @Column()
    @IsString()
    flight_number: string;

    @Column()
    @IsNumberString() //TODO only number
    @IsOptional()
    row: number;

    @Column()
    @IsNumberString() //TODO only number
    @IsOptional()
    seat: number;

    @ManyToOne('User')
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne('Flight')
    @JoinColumn({ name: 'flight_number' })
    flight: Flight;
}
