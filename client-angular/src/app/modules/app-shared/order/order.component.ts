import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  dataSource;

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['number', 'flight_number', 'passenger_hebrew_name', 'passenger_passport', 'row', 'seat', 'paid_seat'];

  @ViewChild(MatSort) sort: MatSort;

}
