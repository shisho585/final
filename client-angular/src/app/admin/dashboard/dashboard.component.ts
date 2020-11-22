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
