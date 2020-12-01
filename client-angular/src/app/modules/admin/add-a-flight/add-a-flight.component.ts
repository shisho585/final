import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

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
  plainTypes: string[];

  constructor(
    private route: ActivatedRoute,
    private service: AdminService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.service.getPlainTypes().subscribe(
      plainTypes => this.plainTypes = plainTypes
    )
    let id;
    if (id = this.route.snapshot.paramMap.get('ID')) {
      this.service.getFlight(id).subscribe(
        flight => {
          this.flight = flight;
          this.today = null;
        }
      )
    }
  }

  save() {
    this.service.createFlight(this.flight).subscribe(
      (flight: Flight) => {
        this.appService.openMessageDialog("טיסה מס' " + flight.flight_no + " נשמרה בהצלחה")
        this.service.navigateToHome();
      },
      error => {
        const errorHeader = "השגיאות הבאות התרחשו במהלך השמירה";
        const errorMessage = error.error.message.toString().replaceAll(',', '\n');
        this.appService.openMessageDialog(errorMessage, errorHeader);
      }
    )
  }
}
