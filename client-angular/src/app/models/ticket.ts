import { Passenger } from './passenger';
import { Order } from './order';

export class Ticket {
    number?: number;
    flight_number: number;
    passenger_passport: number;
    passenger = new Passenger();
    row: number;
    seat: number;
    order_number: number;
    order?: Order;
}