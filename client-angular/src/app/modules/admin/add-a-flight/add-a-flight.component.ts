import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { map } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorsComponent } from '../../app-shared/dialog-errors/dialog-errors.component';

@Component({
  selector: 'app-add-a-flight',
  templateUrl: './add-a-flight.component.html',
  styleUrls: ['./add-a-flight.component.scss']
})
export class AddaflightComponent implements OnInit {

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
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
        this.dialog.open(
          DialogErrorsComponent,
          { data: "טיסה מס' " + data.number + " נשמרה בהצלחה" }
        )
        this.router.navigate(['admin', 'dashboard'])
      },
      error => {
        this.dialog.open(
          DialogErrorsComponent,
          { data: "השגיאות הבאות התרחשו במהלך השמירה:\n" + error.error.message.toString().replaceAll(',', '\n') }
        )
      }
    )
  }
}