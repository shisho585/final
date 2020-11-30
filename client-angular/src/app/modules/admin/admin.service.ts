import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight';
import { Plain } from 'src/app/models/plain';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  flights: Flight[];
  plains: Plain[];


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAllFlights() {
    return this.http.get<[]>('http://localhost:3000/api/flight');
  }

  getFlight(id: string) {
    let flight: Observable<Flight>;
    if (this.flights) {
      flight = from([this.flights.find(flight => flight.number == id)])
    } else {
      flight = this.http.get<Flight>('http://localhost:3000/api/flight/' + id)
    }
    return flight;
  }

  createFlight(flgiht: Flight) {
    return this.http.post('http://localhost:3000/api/flight', flgiht);
  }

  deleteFlight(id: string) {
    return this.http.delete<Flight>('http://localhost:3000/api/flight/' + id);
  }

  getAllPlains() {
    return this.http.get<[]>('http://localhost:3000/api/plain');
  }

  getPlainTypes() {
    let plainTypes: Observable<string[]>;
    if (this.plains) {
      plainTypes = from(
        [this.plains
          .map(plain => plain.type)
          .filter((value, index, self) => self.indexOf(value) === index)]
      )
    } else {
      plainTypes = this.http.get<{ type: string }[]>('http://localhost:3000/api/plain/type').pipe(
        map(data => data.map(item => item.type))
      )
    }
    return plainTypes;
  }

  createPlain(plain: Plain) {
    return this.http.post('http://localhost:3000/api/plain', plain);
  }

  navigateToHome() {
    this.router.navigate(['admin']);
  }

}
