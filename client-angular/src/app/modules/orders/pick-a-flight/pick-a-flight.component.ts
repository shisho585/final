import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { Flight } from 'src/app/models/flight';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-pick-a-flight',
  templateUrl: './pick-a-flight.component.html',
  styleUrls: ['./pick-a-flight.component.scss']
})
export class PickaflightComponent implements OnInit {

  flights: Flight[];

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

  minPrice = 0;
  maxPrice = 0;

  ngx_slider_options = { floor: 0, ceil: 0 };


  displayedColumns: string[] = ['departure', 'from_country', 'to_country', 'price'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appService:AppService,
    private service: OrdersService
    ) { }

  ngOnInit(): void {
    this.service.getAllFuturedLightFlights().subscribe(
      data => {
        this.flights = data;

        if (this.flights.length == 0) {
          this.appService.openMessageDialog("כרגע לא צפויות טיסות אצלנו, מחכים לך ביום אחר");
          this.service.navigateToHome();
        }

        this.flights.forEach((flight) => {
          flight.departure = new Date(flight.departure);
          if (this.firstTime == null || flight.departure < this.firstTime) {
            this.firstTime = flight.departure;
          }
          if (this.lastTime == null || flight.departure > this.lastTime) {
            this.lastTime = flight.departure;
          }
          if (!this.sourcesCountries.includes(flight.from_country)) {
            this.sourcesCountries.push(flight.from_country);
          }
          if (!this.destinationsCountries.includes(flight.to_country)) {
            this.destinationsCountries.push(flight.to_country);
          }
          if (this.lowestPrice == null || flight.price < this.lowestPrice) {
            this.lowestPrice = flight.price;
          }
          if (this.highestPrice == null || flight.price > this.highestPrice) {
            this.highestPrice = flight.price;
          }
        });

        this.minTime = this.firstTime.toLocaleString("sv-SE").replace(' ', 'T');
        this.maxTime = this.lastTime.toLocaleString("sv-SE").replace(' ', 'T');

        this.minPrice = this.lowestPrice;
        this.maxPrice = this.highestPrice;

        this.ngx_slider_options = { floor: this.lowestPrice, ceil: this.highestPrice }

        this.dataSource = new MatTableDataSource(this.flights);
        this.dataSource.sort = this.sort;
      }
    )
  }

  search() {
    this.dataSource.data = this.flights.filter((flight) => {
      return flight.departure >= new Date(this.minTime) &&
        flight.departure <= new Date(this.maxTime) &&
        (this.source == '*' || flight.from_country == this.source) &&
        (this.destination == '*' || flight.to_country == this.destination) &&
        flight.price >= this.minPrice &&
        flight.price <= this.maxPrice;
    })
  }
}
