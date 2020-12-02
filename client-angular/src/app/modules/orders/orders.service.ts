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
  order = new Order();
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

  prepareOrder(): Order {
    this.order.user_email = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email;
    this.order.seats_chosen = this.chosenSeats;
    this.order.price = this.flight.price * this.newTickets.length + this.chosenSeats * 20;

    this.newTickets.forEach(ticket => {
      ticket.flight_number = this.flight.flight_no;
      this.order.tickets.push(ticket);
    });
    return this.order;
  }

  createOrder(order: Order) {
    return this.http.post('http://localhost:3000/api/order', order);
  }

  getPassenger(passport: number) {
    return this.http.get('http://localhost:3000/api/passenger/' + passport);
  }

  navigateToHome() {
    this.router.navigate(['orders']);
  }

  navigate(segment: string) {
    this.router.navigate(['orders', segment]);
  }

}
