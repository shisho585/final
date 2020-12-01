import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  flight: Flight;

  constructor(
    private route: ActivatedRoute,
    private service: AdminService
  ) {
    service.getFlight(this.route.snapshot.paramMap.get('ID')).subscribe(
      data => {
        data.seats = new Array(data.plain.number_of_rows);
        for (let index = 0; index < data.plain.number_of_rows; index++) {
          data.seats[index] = new Array(data.plain.seats_to_row);
        }
        data.estimated_time = Math.round(data.distance / data.plain.speed * 60);
        data.estimated_time_string = Math.floor(data.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (data.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
        data.departure = new Date(data.departure);
        data.landing = new Date(data.departure);
        data.landing.setMinutes(data.departure.getMinutes() + data.estimated_time);
        data.tickets.forEach(ticket => data.seats[ticket.row][ticket.seat] = ticket.passenger_passport)

        this.flight = data;
      }
    )
  }

  ngOnInit(): void { }

  delete() {
    this.service.deleteFlight(this.flight.flight_no).subscribe(
      data => console.log(data)

    )
  }

}
