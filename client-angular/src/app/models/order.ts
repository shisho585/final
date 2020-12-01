import { Ticket } from "./ticket";
import { User } from "./user";

export class Order {
    readonly order_no: number;
    user_email: string;
    seats_chosen: number;
    price: number;
    user?: User;
    tickets = new Array<Ticket>();
}