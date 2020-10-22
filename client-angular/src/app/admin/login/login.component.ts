import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  pass: string;

  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') != undefined) {
      router.navigate(['admin', 'dashboard']);
    }
  }

  ngOnInit(): void {
  }

  enter() {
    if (this.userName == "shisho" && this.pass == "shisho") {
      localStorage.setItem('loggedIn', this.userName);
      this.router.navigate(['admin', 'dashboard']);
    } else {
      console.log("incorrect");      
      console.log(this.userName);      
      console.log(this.pass);      
    }
  }

}
