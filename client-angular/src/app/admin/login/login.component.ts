import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  pass: string;
  urlToRoute: string;

  constructor(private router: Router) {
    let state = router.getCurrentNavigation().extras.state;
    this.urlToRoute = state != undefined ? state.url : 'admin/dashboard';
  }

  ngOnInit(): void { }

  enter() {
    if (this.userName == "shisho" && this.pass == "shisho") {
      localStorage.setItem('loggedIn', this.userName);
      this.router.navigate([this.urlToRoute]);
    } else {
      console.log("incorrect");
      console.log(this.userName);
      console.log(this.pass);
    }
  }

}
