import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

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
          map(data => true)
        )
    }
    this.router.navigate(['admin', 'login'], { state: { url: state.url } })
    return false;
  }
}
