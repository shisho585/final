import { Passenger } from './passenger';
import { Order } from './order';

export class Ticket {
    ticket_no?: number;
    flight_number: string;
    passenger_passport: number;
    passenger = new Passenger();
    row: number;
    seat: number;
    order_number: number;
    order?: Order;
}