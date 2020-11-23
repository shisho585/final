import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, } from 'typeorm';
import { IsString, IsNumberString, ValidateNested, IsNumber, } from 'class-validator';
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
    @IsNumber()
    row: number;

    @Column()
    @IsNumber()
    seat: number;

    @ManyToOne('User', { cascade: true })
    @JoinColumn({ name: 'user_id' })
    @ValidateNested()
    user: User;

    @ManyToOne('Flight')
    @JoinColumn({ name: 'flight_number' })
    flight: Flight;
}
