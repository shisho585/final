import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tick } from '@angular/core/testing';

export class Flight {
  number: number;
  departure: Date;
  from_country: string;
  from_terminal: string;
  to_country: string;
  to_terminal: string;
  distance: number;
  estimated_time?: number;
  estimated_time_string?: string;
  landing?: Date;
  plain: Plain;
  price: number;
  tickets: Ticket[];
  seats?: number[][];
}

export class Plain {
  type: string;
  number_of_rows: number;
  seats_to_row: number;
  range: number;
  speed: number;
}

export class Ticket {
  user_id: number;
  row: number;
  seat: number;
}

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  ELEMENT_DATA: Flight;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    http.get<Flight>("http://localhost:3000/api/flight/" + this.route.snapshot.paramMap.get('ID')).subscribe(
      data => {
        this.ELEMENT_DATA = data;

        console.log(data, 'first');
        this.ELEMENT_DATA.seats = new Array(this.ELEMENT_DATA.plain.number_of_rows);
        for (let index = 0; index < this.ELEMENT_DATA.plain.number_of_rows; index++) {
          this.ELEMENT_DATA.seats[index] = Array(this.ELEMENT_DATA.plain.seats_to_row);
        }

        this.ELEMENT_DATA.estimated_time = Math.round(data.distance / data.plain.speed * 60);
        this.ELEMENT_DATA.estimated_time_string = Math.floor(this.ELEMENT_DATA.estimated_time / 60).toLocaleString('il', { minimumIntegerDigits: 2 }) + ":" + (this.ELEMENT_DATA.estimated_time % 60).toLocaleString('il', { minimumIntegerDigits: 2 });
        this.ELEMENT_DATA.departure = new Date(this.ELEMENT_DATA.departure);
        this.ELEMENT_DATA.landing = new Date(this.ELEMENT_DATA.departure);
        this.ELEMENT_DATA.landing.setMinutes(data.departure.getMinutes() + this.ELEMENT_DATA.estimated_time);
        this.ELEMENT_DATA.tickets.forEach(ticket => this.ELEMENT_DATA.seats[ticket.row][ticket.seat] = ticket.user_id)

      }
    )
  }

  ngOnInit(): void { }

}
