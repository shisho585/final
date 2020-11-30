import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ticket: Ticket;

  constructor(private router: Router) {
    try {
      this.ticket = router.getCurrentNavigation().extras.state.data;
    } catch (error) {
      router.navigate([router.getCurrentNavigation().extractedUrl.root.children.primary.segments[0].path])
    }
  }

  ngOnInit(): void {
  }

}
