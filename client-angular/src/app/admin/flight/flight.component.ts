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

  ELEMENT_DATA: Flight;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    http.get<Flight>("http://localhost:3000/api/flight/" + this.route.snapshot.paramMap.get('ID')).subscribe(
      data => {
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
        this.ELEMENT_DATA.tickets.forEach(ticket => this.ELEMENT_DATA.seats[ticket.row][ticket.seat] = ticket.passenger_passport)

      }
    )
  }

  ngOnInit(): void { }

}
