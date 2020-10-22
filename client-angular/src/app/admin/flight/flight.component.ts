import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') == undefined) {
      router.navigate(['admin', 'login']);
    }
  }

  ngOnInit(): void {
  }

}
