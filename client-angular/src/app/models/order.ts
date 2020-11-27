import { Ticket } from "./ticket";
import { User } from "./user";

export class Order {
    readonly number: number;
    user_email: string;
    seats_chosen: number;
    user?: User;
    tickets = new Array<Ticket>();
}