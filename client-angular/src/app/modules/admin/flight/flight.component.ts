import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  flight: Flight;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    http.get<{ flight: Flight, freeSeats: number }>("http://localhost:3000/api/flight/" + this.route.snapshot.paramMap.get('ID')).subscribe(
      data => {
        data.flight.seats = new Array(data.flight.plain.number_of_rows);
        for (let index = 0; index < data.flight.plain.number_of_rows; index++) {
          data.flight.seats[index] = Array(data.flight.plain.seats_to_row);
        }
        data.flight.estimated_time = Math.round(data.flight.distance / data.flight.plain.speed * 60);
        data.flight.estimated_time_string = Math.floor(data.flight.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (data.flight.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
        data.flight.departure = new Date(data.flight.departure);
        data.flight.landing = new Date(data.flight.departure);
        data.flight.landing.setMinutes(data.flight.departure.getMinutes() + data.flight.estimated_time);
        data.flight.tickets.forEach(ticket => data.flight.seats[ticket.row][ticket.seat] = ticket.passenger_passport)

        this.flight = data.flight;
      }
    )
  }

  ngOnInit(): void { }

}
