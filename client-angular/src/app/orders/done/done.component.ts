import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  seats: number;

  constructor(public service: OrdersService, private router: Router) {
    if (service.flight == undefined) {
      router.navigate(['orders', 'pick-a-flight'])
    }
    this.seats = service.tickets.filter(ticket => Number.isInteger(ticket.row) && Number.isInteger(ticket.seat)).length
  }

  ngOnInit(): void {
  }

}
