import { User } from './user';

export class Ticket {
    flight_number: number;
    user_id: number;
    row: number;
    seat: number;
    user = new User();
}