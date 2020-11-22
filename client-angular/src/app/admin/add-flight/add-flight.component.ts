import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {

  flight = new Flight();
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
      (data: Flight) => {
        alert("טיסה מס' " + data.number + " נשמרה בהצלחה")//TODO nice popup
        this.router.navigate(['admin', 'dashboard'])
      },
      error => {//TODO nice popup and hebrew names
        alert("השגיאות הבאות התרחשו במהלך השמירה:\n" + error.error.message.toString().replaceAll(',', '\n'))
      }
    )
  }
}
