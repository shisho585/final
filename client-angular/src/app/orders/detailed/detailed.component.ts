import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from '../orders.service';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight';
import { User } from 'src/app/models/user';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  passengers = 1;

  ELEMENT_DATA: Flight;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public service: OrdersService,
  ) {
    http.get<Flight>("http://localhost:3000/api/flight/" + this.route.snapshot.paramMap.get('flightID')).subscribe(
      data => {

        if (data == null) router.navigate(['orders', 'pick-a-flight']);
        this.ELEMENT_DATA = data;

        this.ELEMENT_DATA.seats = new Array(this.ELEMENT_DATA.plain.number_of_rows);
        for (let index = 0; index < this.ELEMENT_DATA.plain.number_of_rows; index++) {
          this.ELEMENT_DATA.seats[index] = Array(this.ELEMENT_DATA.plain.seats_to_row);
        }
        this.ELEMENT_DATA.estimated_time = Math.round(data.distance / data.plain.speed * 60);
        this.ELEMENT_DATA.estimated_time_string = Math.floor(this.ELEMENT_DATA.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (this.ELEMENT_DATA.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
        this.ELEMENT_DATA.departure = new Date(this.ELEMENT_DATA.departure);
        this.ELEMENT_DATA.landing = new Date(this.ELEMENT_DATA.departure);
        this.ELEMENT_DATA.landing.setMinutes(data.departure.getMinutes() + this.ELEMENT_DATA.estimated_time);

      },
      error => {
        console.log(error.error.message);
        router.navigate(['orders', 'pick-a-flight']);
      }
    )
    this.passengers = service.tickets.length;

  }

  ngOnInit(): void { }

  changePassengersNumber() {
    if (this.passengers > this.service.tickets.length) {
      this.service.tickets.push(new Ticket());
    } else if (this.passengers < this.service.tickets.length) {
      this.service.tickets.pop();
    }
  }

  isThereUsers(): boolean {
    return this.service.tickets.some(ticket => ticket.user.hebrew_name != '' && ticket.user.english_name != '' && ticket.user.passport_id != null);
  }

  saveData() {
    this.service.tickets = this.service.tickets.filter(ticket => ticket.user.hebrew_name != '' && ticket.user.english_name != '' && ticket.user.passport_id != null);
    this.service.flight = this.ELEMENT_DATA;
  }

}
