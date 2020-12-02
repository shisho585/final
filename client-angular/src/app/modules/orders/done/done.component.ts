import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Ticket } from 'src/app/models/ticket';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  flight = this.service.flight;
  newTickets = this.service.newTickets;
  chosenSeats = this.service.chosenSeats;
  order = this.service.order;

  constructor(public service: OrdersService) { }

  ngOnInit(): void {
    if (this.service.flight == undefined) {
      this.service.navigateToHome();
    }
    this.service.flight = null;
    this.service.newTickets = [new Ticket()];
    this.service.chosenSeats = 0;
    this.service.order = new Order();
  }

}
