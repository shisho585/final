import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialog } from './message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) { }

  openMessageDialog(message: string, header?: string) {
    this.dialog.open(
      MessageDialog,
      { data: { header, message } }
    )
  }

  authenticate() {
    return this.http.get('http://localhost:3000/api/authenticate',
      { headers: { authorization: localStorage.getItem('loggedInToken') }, responseType: 'text' }
    )
  }

  navigateToHome() {
    this.router.navigate([]);
  }

  navigateToLogin(urlTOResolve: string) {
    this.router.navigate(['login'], { state: { url: urlTOResolve } });
  }
}
