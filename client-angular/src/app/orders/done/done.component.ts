import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  seats: number;

  constructor(public service: OrdersService) {
    this.seats = service.persons.filter(person => Number.isInteger(person.selectedRow) && Number.isInteger(person.selectedSeat)).length
  }

  ngOnInit(): void {
  }

}
