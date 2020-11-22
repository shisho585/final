import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Ticket } from '../models/ticket';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  flight: Flight;
  users = [new User()];
  tickets = [new Ticket()];

  constructor() { }
}
