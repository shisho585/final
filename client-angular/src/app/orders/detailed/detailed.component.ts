import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from '../orders.service';
import { HttpClient } from '@angular/common/http';
import { Flight } from 'src/app/models/flight.interface';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  passengers = 1;

  ELEMENT_DATA;

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
    // this.passengers = service.persons.length;
    // for (let ELEMENT of ELEMENT_DATA_BASE) {
    //   for (let index = 0; index < 30; index++) {
    //     ELEMENT.seats[index] = [false, false, false, false, false, false];
    //   }
    // }
  }

  ngOnInit(): void { }

  changePassengersNumber() {
    if (this.passengers > this.service.persons.length) {
      this.service.persons.push({ heName: '', enName: '', passpord: null });
    } else if (this.passengers < this.service.persons.length) {
      this.service.persons.pop();
    }
  }

  isTherePersons(): boolean {
    return this.service.persons.some(person => person.heName != '' && person.enName != '' && person.passpord != null);
  }

  saveData() {
    this.service.persons = this.service.persons.filter(person => person.heName != '' && person.enName != '' && person.passpord != null);
    this.service.flight = this.ELEMENT_DATA;
  }

}
