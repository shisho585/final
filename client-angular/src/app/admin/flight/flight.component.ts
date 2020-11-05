import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class PeriodicElement {
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
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  flight: PeriodicElement = new PeriodicElement();
  today = new Date();

  sourcesCountries = ['ישראל', 'יפן', 'איטליה'];
  targetCountries = ['ישראל', 'יפן', 'קנדה'];
  plainTypes = ['בואינג 747', 'איירבוס 430', 'בואינג 556'];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  save() {
    //send to DB
    let rows: number;
    let seats: number;
    switch (this.flight.plainType) {
      case 'בואינג 747':
        rows = 50;
        seats = 9;
        break;
      case 'איירבוס 430':
        rows = 35;
        seats = 6;
        break;
      case 'בואינג 556':
        rows = 28;
        seats = 6;
        break;
      default:
        rows = 30;
        seats = 6;
        break;
    }
    this.flight.seats = new Array(rows).fill(new Array(false));
  }
}
