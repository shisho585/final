import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  landingTime: Date;
  arrivalTime: Date;
  sourceCountry: string;
  sourceTerminal: string;
  targetCountry: string;
  targetTerminal: string;
  distance: number;
  estimatedTime: number;
  plainType: string;
  seats: boolean[][];
  cost: number;
  id: string;
  freeSeats?: number;
}

export class Flight {
  number: number;
  departure: Date;
  from_country: string;
  from_terminal: string;
  to_country: string;
  to_terminal: string;
  distance: number;
  plain_type: string;
  price: number;
}

let ELEMENT_DATA_BASE: PeriodicElement[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
    http.get<[]>('http://localhost:3000/api/flight').subscribe(
      data => {
        ELEMENT_DATA_BASE = data
        // ELEMENT_DATA_BASE.forEach(ELEMENT_DATA => {
        //   ELEMENT_DATA.freeSeats = ELEMENT_DATA.seats.map<number>(row => row.filter(seat => !seat).length).reduce((a, b) => a + b);
        // });
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_BASE);
        this.dataSource.sort = this.sort;
      }
    )
  }

  dataSource;
  displayedColumns: string[] = ['number', 'plain_type', 'departure', 'from', 'to', 'distance', 'price'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
