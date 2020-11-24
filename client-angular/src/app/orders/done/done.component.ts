import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  flight = this.service.flight;
  tickets = this.service.tickets;
  chosenSeats = this.service.chosenSeats;

  constructor(public service: OrdersService, private router: Router) {
    if (service.flight == undefined) {
      router.navigate(['orders', 'pick-a-flight'])
    }
    this.service.flight = null;
    this.service.tickets = [new Ticket()];
    this.service.chosenSeats = 0;
  }

  ngOnInit(): void { }

}
