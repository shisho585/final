import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('loggedInToken') != undefined) {
      return this.http.post(
        'http://localhost:3000/login',
        { token: localStorage.getItem('loggedInToken') },
        { responseType: 'text' }).pipe(
          catchError(err => {
            this.router.navigate(['admin', 'login'], { state: { url: state.url } })
            return EMPTY
          }),
          map((data) => {
            return true;
          })
        )
    }
    this.router.navigate(['admin', 'login'], { state: { url: state.url } })
  }
}
