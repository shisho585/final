import { Ticket } from './ticket';
import { Plain } from './plain';

export class Flight {
    readonly id: number;
    flight_no: string;
    departure: Date;
    from_country: string;
    from_terminal: string;
    to_country: string;
    to_terminal: string;
    distance: number;
    estimated_time?: number;
    estimated_time_string?: string;
    landing?: Date;
    plain_type: string;
    plain?: Plain;
    price: number;
    tickets = [new Ticket()];
    freeSeats: number;
    seats?: number[][];
}