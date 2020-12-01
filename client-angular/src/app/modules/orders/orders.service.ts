import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Flight } from '../../models/flight';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  flight: Flight;
  newTickets = [new Ticket()];
  chosenSeats = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getAllFuturedLightFlights() {
    return this.http.get<Flight[]>("http://localhost:3000/api/flight/light/future");
  }

  getFlight(id: string) {
    return this.http.get<Flight>("http://localhost:3000/api/flight/" + id);
  }

  createOrder(order: Order) {
    return this.http.post('http://localhost:3000/api/order', order);
  }

  navigateToHome() {
    this.router.navigate(['orders']);
  }

  navigate(segment: string) {
    this.router.navigate(['orders', segment]);
  }

}
