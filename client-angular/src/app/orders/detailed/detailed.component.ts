import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from '../orders.service';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  passengers = 1;

  flight: Flight;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public service: OrdersService,
  ) {
    http.get<{ flight: Flight, freeSeats: number }>(
      "http://localhost:3000/api/flight/" + this.route.snapshot.paramMap.get('flightID'))
      .subscribe(
        data => {
          if (data == null) router.navigate(['orders', 'pick-a-flight']);
          this.flight = data.flight;
          this.flight.freeSeats = data.freeSeats;

          this.flight.seats = new Array(this.flight.plain.number_of_rows);
          for (let index = 0; index < this.flight.plain.number_of_rows; index++) {
            this.flight.seats[index] = Array(this.flight.plain.seats_to_row);
          }
          this.flight.estimated_time = Math.round(this.flight.distance / this.flight.plain.speed * 60);
          this.flight.estimated_time_string = Math.floor(this.flight.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (this.flight.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
          this.flight.departure = new Date(this.flight.departure);
          this.flight.landing = new Date(this.flight.departure);
          this.flight.landing.setMinutes(this.flight.departure.getMinutes() + this.flight.estimated_time);

        },
        error => {
          console.error(error.error.message);
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
    return this.service.tickets.some(ticket =>
      ticket.passenger.hebrew_name != '' &&
      ticket.passenger.english_name != '' &&
      ticket.passenger.passport != null);
  }

  saveData() {
    this.service.tickets = this.service.tickets
      .filter(ticket => ticket.passenger.hebrew_name != '' && ticket.passenger.english_name != '' && ticket.passenger.passport != null);
    this.service.flight = this.flight;
    console.log(this.service.tickets);

  }
}
