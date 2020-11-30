import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorsComponent } from '../dialog-errors/dialog-errors.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();

  login = true;
  canRegister = true;
  @Output() loggedIn = new EventEmitter();

  urlToRoute: string;

  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog) {
    if (router.getCurrentNavigation()) {
      let state = router.getCurrentNavigation().extras.state;
      this.urlToRoute = state != undefined ? state.url : 'user/dashboard';
      if (this.urlToRoute.includes('admin')) {
        this.canRegister = false;
      }
    }
  }

  ngOnInit(): void { }

  registerUser() {
    this.http.post(
      'http://localhost:3000/api/user',
      this.user,
      { responseType: 'text' }
    ).subscribe(
      res => {
        localStorage.setItem('loggedInToken', res.toString());
        if (this.urlToRoute) {
          this.router.navigate([this.urlToRoute]);
        } else {
          this.loggedIn.emit('register');
        }
      },
      err => {
        let message = JSON.parse(err.error).message.toString();
        if (message.includes('duplicate')) {
          message = "משתמש בשם זה כבר רשום אצלנו\nנסה להיכנס במקום"
        }
        this.dialog.open(DialogErrorsComponent, { data: message.replaceAll(',', '\n') })
      }
    )
  }

  enter() {
    this.http.get(
      'http://localhost:3000/api/login',
      { headers: { email: this.user.email, password: this.user.password }, responseType: 'text' }
    ).subscribe(
      res => {
        localStorage.setItem('loggedInToken', res.toString());
        if (this.urlToRoute) {
          this.router.navigate([this.urlToRoute]);
        } else {
          this.loggedIn.emit('enter');
        }
      },
      err => { this.dialog.open(DialogErrorsComponent, { data: "שם המשתמש או הסיסמא אינם נכונים" }) }
    )
  }
}
