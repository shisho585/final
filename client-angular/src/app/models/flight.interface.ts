import { Ticket } from './ticket.interface';
import { Plain } from './plain.interface';

export interface Flight {
    number: number;
    departure: Date;
    from_country: string;
    from_terminal: string;
    to_country: string;
    to_terminal: string;
    distance: number;
    estimated_time?: number;
    estimated_time_string?: string;
    landing?: Date;
    plain: Plain;
    price: number;
    tickets: Ticket[];
    seats?: number[][];
}