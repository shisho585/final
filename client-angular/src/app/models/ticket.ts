import { Passenger } from './passenger';

export class Ticket {
    flight_number: number;
    passenger_passport: number;
    row: number;
    seat: number;
    passenger = new Passenger();
}