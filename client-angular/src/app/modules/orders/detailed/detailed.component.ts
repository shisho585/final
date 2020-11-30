import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from '../orders.service';
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
    private route: ActivatedRoute,
    public service: OrdersService
  ) { }

  ngOnInit(): void {
    this.service.getFlight(this.route.snapshot.paramMap.get('flightID')).subscribe(
      data => {
        if (data == null) this.service.navigateToHome();

        this.service.flight = data;
        this.service.flight.freeSeats = data.freeSeats;
        this.service.flight.seats = new Array(this.service.flight.plain.number_of_rows);
        for (let index = 0; index < this.service.flight.plain.number_of_rows; index++) {
          this.service.flight.seats[index] = Array(this.service.flight.plain.seats_to_row);
        }
        this.service.flight.estimated_time = Math.round(this.service.flight.distance / this.service.flight.plain.speed * 60);
        this.service.flight.estimated_time_string = Math.floor(this.service.flight.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (this.service.flight.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
        this.service.flight.departure = new Date(this.service.flight.departure);
        this.service.flight.landing = new Date(this.service.flight.departure);
        this.service.flight.landing.setMinutes(this.service.flight.departure.getMinutes() + this.service.flight.estimated_time);
      },
      error => {
        console.error(error.error.message);
        this.service.navigateToHome();
      }
    )
    this.passengers = this.service.newTickets.length;

  }

  changePassengersNumber() {
    if (this.passengers > this.service.newTickets.length) {
      this.service.newTickets.push(new Ticket());
      this.changePassengersNumber();
    } else if (this.passengers < this.service.newTickets.length) {
      this.service.newTickets.pop();
      this.changePassengersNumber();
    }
  }

  isThereUsers(): boolean {
    return this.service.newTickets.some(ticket =>
      ticket.passenger.hebrew_name != '' &&
      ticket.passenger.english_name != '' &&
      ticket.passenger.passport != null);
  }

  saveData() {
    this.service.newTickets = this.service.newTickets
      .filter(ticket =>
        ticket.passenger.hebrew_name != '' &&
        ticket.passenger.english_name != '' &&
        ticket.passenger.passport != null);
  }
}
