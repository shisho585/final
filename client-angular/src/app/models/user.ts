import { Ticket } from "./ticket";
import { Order } from './order';

export class User {
    name: string;
    password?: string;
    email: string;
    phone: number;
    role: string;
    orders?: Order[];
}