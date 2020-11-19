import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {

  flight: Flight = new Flight();
  today = new Date();

  sourcesCountries = ['Israel', 'Japan', 'Italy'];
  targetCountries = ['Israel', 'Japan', 'Canada'];
  terminals = {
    'Israel': ['TLV', 'RMN'],
    'Japan': ['BGN', 'HKN', 'SHN'],
    'Italy': ['IAP', 'MFP'],
    'Canada': ['MNT', 'QEB'],
  }
  plainTypes = ['בואינג 747', 'איירבוס 430', 'בואינג 556'];

  constructor(private router: Router, private http: HttpClient) {
    http.get<{ type: string }[]>('http://localhost:3000/api/plain/type').pipe(
      map(data => data.map(item => item.type))
    ).subscribe(
      data => this.plainTypes = data
    )
  }

  ngOnInit(): void { }

  save() {
    this.http.post(
      'http://localhost:3000/api/flight',
      this.flight
    ).subscribe(
      data => console.log(data),
      error => console.error(error.error.message)
    )
  }
}
