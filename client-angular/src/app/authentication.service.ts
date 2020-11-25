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
    if (localStorage.getItem('loggedInToken') == undefined) {
      this.router.navigate(['login'], { state: { url: state.url } });
    } else {
      return this.http.get(
        'http://localhost:3000/api/authenticate',
        { headers: { authorization: localStorage.getItem('loggedInToken') }, responseType: 'text' }
      ).pipe(
        map(
          res => {
            if (res == 'pass') {
              return true;
            } else {
              this.router.navigate(['login'], { state: { url: state.url } })
            }
          }
        )
      )
      // .pipe(
      //   catchError(err => {
      //     this.router.navigate(['login'], { state: { url: state.url } })
      //     return EMPTY
      //   }),
      //   map((data) => {
      //     return true;
      //   })
      // )
    }
  }
}
