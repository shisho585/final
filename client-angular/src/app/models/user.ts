import { Ticket } from "./ticket";
import { Order } from './order';

export class User {
    readonly id: number;
    email: string;
    name: string;
    password?: string;
    phone: number;
    role: string;
    orders?: Order[];
}