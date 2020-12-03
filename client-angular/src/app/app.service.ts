import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialog } from './message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  LoggedIn: string;
  admin: boolean;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) {
    this.authenticate();
  }

  openMessageDialog(message: string, header?: string, modal?: boolean, confirm?: boolean) {
    this.closeAll();
    return this.dialog.open(
      MessageDialog,
      { disableClose: modal, data: { header, message, confirm } }
    )
  }

  closeAll() {
    this.dialog.closeAll();
  }

  authenticate() {
    return this.http.get('http://localhost:3000/api/authenticate',
      { headers: { authorization: localStorage.getItem('loggedInToken') }, responseType: 'text' }
    ).toPromise().then(
      res => {
        if (res == 'admin') {
          this.admin = true;
          this.LoggedIn = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).name;
        } else if (res == 'user') {
          this.LoggedIn = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).name;
          this.admin = false;
        } else {
          this.LoggedIn = null;
          this.admin = false;
        }
        return res;
      }
    ).catch(
      err => {
        this.LoggedIn = null;
        this.admin = false;
        return err;
      }
    )
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToLogin(urlTOResolve: string) {
    this.router.navigate(['login'], { state: { url: urlTOResolve } });
  }
}
