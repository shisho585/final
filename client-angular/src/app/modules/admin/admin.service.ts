import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { Plain } from 'src/app/models/plain';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  flightsS = new BehaviorSubject<Flight[]>(null);
  plainsS = new BehaviorSubject<Plain[]>(null);
  flights: Flight[];
  plains: Plain[];


  constructor(private http: HttpClient) {
    this.getFlights();
    this.getPlains();
  }

  private getFlights() {
    this.http.get<[]>('http://localhost:3000/api/flight').subscribe(
      data => this.flightsS.next(data)
    )
  }

  private getPlains() {
    this.http.get<[]>('http://localhost:3000/api/plain').subscribe(
      data => this.plainsS.next(data)
    )
  }
}
