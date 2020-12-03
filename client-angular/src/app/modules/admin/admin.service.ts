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
    return this.http.get<Flight>('http://localhost:3000/api/flight/' + id)
  }

  createFlight(flgiht: Flight) {
    return this.http.post(
      'http://localhost:3000/api/flight',
      flgiht,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }

  deleteFlight(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/flight/' + id,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }

  getAllPlains() {
    return this.http.get<[]>(
      'http://localhost:3000/api/plain',
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }

  getPlain(id: string) {
    return this.http.get<Plain>(
      'http://localhost:3000/api/plain/' + id,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    )
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
      plainTypes = this.http.get<{ type: string }[]>(
        'http://localhost:3000/api/plain/type',
        { headers: { authorization: localStorage.getItem('loggedInToken') } }
      ).pipe(
        map(data => data.map(item => item.type))
      )
    }
    return plainTypes;
  }

  createPlain(plain: Plain) {
    return this.http.post(
      'http://localhost:3000/api/plain',
      plain,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }

  deletePlain(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/plain/' + id,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    )
  }

  getAllUsers() {
    return this.http.get<[]>(
      'http://localhost:3000/api/user',
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    );
  }

  deleteUser(id: string) {
    return this.http.delete(
      'http://localhost:3000/api/user/' + id,
      { headers: { authorization: localStorage.getItem('loggedInToken') } }
    )
  }

  navigateToHome() {
    this.router.navigate(['admin']);
  }
}
