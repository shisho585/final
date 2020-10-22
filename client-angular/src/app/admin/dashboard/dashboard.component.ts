import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') == undefined) {
      router.navigate(['admin', 'login']);
    } 
  }

  ngOnInit(): void {
  }

}
