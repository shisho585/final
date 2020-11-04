import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  pass: string;
  urlToRoute: string;

  constructor(private router: Router, private http: HttpClient) {
    let state = router.getCurrentNavigation().extras.state;
    this.urlToRoute = state != undefined ? state.url : 'admin/dashboard';
  }

  ngOnInit(): void { }

  enter() {
    this.http.post(
      'http://localhost:3000/login',
      { userName: this.userName, password: this.pass },
      { responseType: 'text' }).subscribe(
        res => {
          console.log('res: ' + res)
          localStorage.setItem('loggedInToken', res);
          this.router.navigate([this.urlToRoute]).then(
            () => console.log('redirect to ' + this.urlToRoute)
          );
        },
        err => {
          console.log("incorrect");
          console.log(this.userName);
          console.log(this.pass);
        }
      )

    // if (this.userName == "shisho" && this.pass == "shisho") {
    //   localStorage.setItem('loggedIn', this.userName);
    //   this.router.navigate([this.urlToRoute]);
    // } else {
    //   console.log("incorrect");
    //   console.log(this.userName);
    //   console.log(this.pass);
    // }
  }

}
