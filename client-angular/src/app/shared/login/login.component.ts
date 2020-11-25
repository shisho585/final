import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();

  login = true;
  @Output() logined = new EventEmitter();

  urlToRoute: string;

  constructor(private router: Router, private http: HttpClient) {
    if (router.getCurrentNavigation()) {
      let state = router.getCurrentNavigation().extras.state;
      this.urlToRoute = state != undefined ? state.url : 'admin/dashboard';
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
        console.log(res);

        localStorage.setItem('loggedInToken', res.toString());
        if (this.urlToRoute) {
          this.router.navigate([this.urlToRoute]);
        } else {
          this.logined.emit('register');
        }
      },
      err => console.error(err)
    )
  }

  enter() {
    this.http.get(
      'http://localhost:3000/api/login',
      { headers: { user_name: this.user.name, password: this.user.password }, responseType: 'text' }
    ).subscribe(
      res => {
        console.log(res);

        localStorage.setItem('loggedInToken', res.toString());
        if (this.urlToRoute) {
          this.router.navigate([this.urlToRoute]);
        } else {
          this.logined.emit('enter');
        }
      },
      err => {
        console.log(err);

        console.log("incorrect");
        console.log(this.user.name);
        console.log(this.user.password);
      }
    )
  }
}
