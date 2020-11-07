import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from '../orders.service';

// This class and array after it, is just for illustrate data from DB.
// In the prod, i will remove the class and run query on real DB. 
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
}

const ELEMENT_DATA_BASE: PeriodicElement[] = [
  {
    landingTime: new Date(2020, 1, 11, 20), arrivalTime: new Date(2020, 1, 13, 0, 15), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'ארה"ב', targetTerminal: 'NYS', distance: 25350, estimatedTime: 1340, plainType: 'airbus',
    seats: new Array(30).fill([false, true, true, false, false, false])
    , cost: 2060, id: 'FX5366'
  },
  {
    landingTime: new Date(2020, 0, 13, 22, 15), arrivalTime: new Date(2020, 0, 14, 0, 15), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'איטליה', targetTerminal: 'ITL', distance: 2520, estimatedTime: 120, plainType: 'airbus', seats: new Array(30).fill(new Array(6).fill(false)), cost: 400, id: 'DW6624'
  },
  {
    landingTime: new Date(2020, 4, 1), arrivalTime: new Date(2020, 4, 1, 2, 35), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'יוון', targetTerminal: 'WSX', distance: 2715, estimatedTime: 155, plainType: 'airbus', seats: new Array(30).fill(new Array(6).fill(false)), cost: 500, id: 'PL9277'
  }
];


@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  passengers: number;

  ELEMENT_DATA: PeriodicElement = ELEMENT_DATA_BASE.find((flight) => this.route.snapshot.paramMap.get('flightID') == flight.id);

  constructor(private router: Router, private route: ActivatedRoute, public service: OrdersService) {
    if (this.ELEMENT_DATA == undefined) {
      router.navigate(['orders', 'pick-a-flight'])
    }
    this.passengers = service.persons.length;
    for (let ELEMENT of ELEMENT_DATA_BASE) {
      for (let index = 0; index < 30; index++) {
        ELEMENT.seats[index] = [false,false,false,false,false,false];
      }
    }
  }

  ngOnInit(): void { }

  changePassengersNumber() {
    if (this.passengers > this.service.persons.length) {
      this.service.persons.push({ heName: '', enName: '', passpord: null });
    } else if (this.passengers < this.service.persons.length) {
      this.service.persons.pop();
    }
  }

  isTherePersons(): boolean {
    return this.service.persons.some(person => person.heName != '' && person.enName != '' && person.passpord != null);
  }

  saveData() {
    this.service.persons = this.service.persons.filter(person => person.heName != '' && person.enName != '' && person.passpord != null);
    this.service.flight = this.ELEMENT_DATA;
  }

}
