import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private router: Router) {
        if (localStorage.getItem('loggedIn') == undefined) {
      router.navigate(['admin', 'login']);
    } 

   }

  ngOnInit(): void {
  }

}
