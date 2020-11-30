import { Injectable } from '@angular/core';
import { Flight } from '../../models/flight';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  flight: Flight;
  tickets = [new Ticket()];
  chosenSeats = 0;

  constructor() { }
}
