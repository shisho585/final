import { Passenger } from './passenger';
import { User } from './user';

export class Ticket {
    number?: number;
    flight_number: number;
    passenger_passport: number;
    contact_user_name = 'shisho';
    row: number;
    seat: number;
    passenger = new Passenger();
    contact_user?: User;
}