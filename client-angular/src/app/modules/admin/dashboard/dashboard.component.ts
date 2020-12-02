import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../app-shared/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private service: AdminService) { }

  flightsDataSource;
  plainsDataSource;
  displayedColumnsOfFlights: string[] = ['number', 'plain_type', 'departure', 'from', 'to', 'distance', 'price'];
  displayedColumnsOfPlains: string[] = ['type', 'speed', 'range', 'number_of_rows', 'seats_to_row'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.service.getAllFlights().subscribe(flights => {
      this.service.flights = flights;
      this.flightsDataSource = new MatTableDataSource(flights);
      this.flightsDataSource.sort = this.sort;
    })

    this.service.getAllPlains().subscribe(plains => {
      this.service.plains = plains;
      this.plainsDataSource = new MatTableDataSource(plains);
      this.plainsDataSource.sort = this.sort;
    });
  }

}
