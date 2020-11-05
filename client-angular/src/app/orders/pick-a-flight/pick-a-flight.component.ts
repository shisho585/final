import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


// This class and array after it, is just for illustrate data from DB.
// In the prod, i will remove the class and fill the array with real data from DB. 
export interface PeriodicElement {
  landingTime: Date;
  source: string;
  target: string;
  cost: number;
  id: string;
}

const ELEMENT_DATA_BASE: PeriodicElement[] = [
  { landingTime: new Date(2020, 0, 13, 22, 15), source: 'ישראל', target: 'איטליה', cost: 400, id: 'DW6624' },
  { landingTime: new Date(2020, 4, 1), source: 'ישראל', target: 'יוון', cost: 500, id: 'PL9277' },
  { landingTime: new Date(2020, 1, 11, 20), source: 'ישראל', target: 'ארה"ב', cost: 2060, id: 'FX5366' }
];

@Component({
  selector: 'app-pick-a-flight',
  templateUrl: './pick-a-flight.component.html',
  styleUrls: ['./pick-a-flight.component.scss']
})
export class PickaflightComponent implements OnInit, AfterViewInit {

  firstTime: Date;
  lastTime: Date;
  sourcesCountries: string[] = [];
  destinationsCountries: string[] = [];
  lowestPrice: number;
  highestPrice: number;

  minTime: string;
  maxTime: string;

  source = '*';
  destination = '*';

  minPrice: number;
  maxPrice: number;

  constructor(private http: HttpClient) {
    ELEMENT_DATA_BASE.forEach((flight) => {
      if (this.firstTime == null || flight.landingTime < this.firstTime) {
        this.firstTime = flight.landingTime;
      }
      if (this.lastTime == null || flight.landingTime > this.lastTime) {
        this.lastTime = flight.landingTime;
      }
      if (!this.sourcesCountries.includes(flight.source)) {
        this.sourcesCountries.push(flight.source);
      }
      if (!this.destinationsCountries.includes(flight.target)) {
        this.destinationsCountries.push(flight.target);
      }
      if (this.lowestPrice == null || flight.cost < this.lowestPrice) {
        this.lowestPrice = flight.cost;
      }
      if (this.highestPrice == null || flight.cost > this.highestPrice) {
        this.highestPrice = flight.cost;
      }
    });

    this.minTime = this.firstTime.toLocaleString("sv-SE").replace(' ', 'T');
    this.maxTime = this.lastTime.toLocaleString("sv-SE").replace(' ', 'T');

    this.minPrice = this.lowestPrice;
    this.maxPrice = this.highestPrice;
  }

  ngOnInit(): void {
  }

  search() {
    this.dataSource.data = ELEMENT_DATA_BASE.filter((flight) => {
      return flight.landingTime >= new Date(this.minTime) &&
        flight.landingTime <= new Date(this.maxTime) &&
        (this.source == '*' || flight.source == this.source) &&
        (this.destination == '*' || flight.target == this.destination) &&
        flight.cost >= this.minPrice &&
        flight.cost <= this.maxPrice;
    })
  }

  displayedColumns: string[] = ['landingTime', 'source', 'target', 'cost'];
  dataSource = new MatTableDataSource(ELEMENT_DATA_BASE);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
