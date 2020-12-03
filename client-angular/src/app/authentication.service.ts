import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(
    private appService: AppService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (localStorage.getItem('loggedInToken') == undefined) {
      this.appService.navigateToLogin(state.url);
    } else {
      return this.appService.authenticate().then(
        res => {
          if (res == 'admin' || (!state.url.includes('admin') && res == 'user')) {
            return true;
          } else {
            this.appService.navigateToLogin(state.url);
          }
        }
      )
    }
  }
}
