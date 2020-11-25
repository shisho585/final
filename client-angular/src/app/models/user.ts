import { Ticket } from "./ticket";

export class User {
    name: string;
    password?: string;
    email: string;
    phone: number;
    role: string;
    tickets?: Ticket;
}