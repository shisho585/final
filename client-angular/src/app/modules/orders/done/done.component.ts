import { Component, OnInit } from '@angular/core';
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

  constructor(public service: OrdersService) {
    if (service.flight == undefined) {
      service.navigateToHome();
    }
    this.service.flight = null;
    this.service.newTickets = [new Ticket()];
    this.service.chosenSeats = 0;
  }

  ngOnInit(): void { }

}
