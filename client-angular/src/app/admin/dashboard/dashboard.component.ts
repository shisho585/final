import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight';

let ELEMENT_DATA_BASE: Flight[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {
    http.get<[]>('http://localhost:3000/api/flight').subscribe(
      data => {
        this.flightsDataSource = new MatTableDataSource(data);
        this.flightsDataSource.sort = this.sort;
      }
    )
    http.get<[]>('http://localhost:3000/api/plain').subscribe(
      data => {
        this.plainsDataSource = new MatTableDataSource(data);
        this.plainsDataSource.sort = this.sort;
      }
    )
  }

  flightsDataSource;
  plainsDataSource;
  displayedColumnsOfFlights: string[] = ['number', 'plain_type', 'departure', 'from', 'to', 'distance', 'price'];
  displayedColumnsOfPlains: string[] = ['type', 'speed', 'range', 'number_of_rows', 'seats_to_row'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
