import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from '../orders.service';
import { Flight } from 'src/app/models/flight';
import { Ticket } from 'src/app/models/ticket';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  freeRows: number[];
  passengers = 1;
  inSeats = false;
  passengersForms: FormArray;

  constructor(
    private route: ActivatedRoute,
    public service: OrdersService,
    private dialog: MatDialog,
    private appService: AppService,
    private fb: FormBuilder
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

        for (let index = 0; index < this.service.flight.plain.number_of_rows; index++) {
          for (let indexB = 0; indexB < this.service.flight.plain.seats_to_row; indexB++) {
            this.service.flight.seats[index][indexB] = null;
          }
        }
        this.service.flight.tickets.forEach(ticket => {
          this.service.flight.seats[ticket.row][ticket.seat] = ticket.passenger_passport;
        })

        this.freeRows = this.service.flight.seats
          .map((row, index) => index)
          .filter(rowIndex => this.service.flight.seats[rowIndex].some(seat => !seat));
      },
      error => {
        console.error(error.error.message);
        this.service.navigateToHome();
      }
    )
    this.passengersForms = this.fb.array([]);
    this.service.newTickets = [new Ticket()]
    this.AddNewPassengerForm();
  }

  AddNewPassengerForm() {
    const passengerForm = this.fb.group({
      hebrew_name: ['', [Validators.required, Validators.pattern('^[\u0590-\u05fe ]*$')]],
      english_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      passport: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
    this.passengersForms.push(passengerForm);
  }

  removePassengerForm() {
    this.passengersForms.removeAt(this.passengersForms.length - 1);
  }


  clearChoises(ticket: Ticket) {
    this.releaseSeat(ticket);
    ticket.row = null;
    ticket.seat = null;
  }

  releaseSeat(ticket: Ticket) {
    if (Number.isInteger(ticket.row) && Number.isInteger(ticket.seat)) {
      this.service.flight.seats[ticket.seat][ticket.seat] = null;
      this.service.chosenSeats--;
      this.freeRows = this.service.flight.seats
        .map((row, index) => index)
        .filter(rowIndex => this.service.flight.seats[rowIndex].some(seat => !seat));
    }
  }

  catchSeat(ticket: Ticket) {
    if (Number.isInteger(ticket.row) && Number.isInteger(ticket.seat)) {
      this.service.chosenSeats++;
      if (this.service.flight.seats[ticket.row][ticket.seat]) {
        ticket.seat = this.service.flight.seats[ticket.row].findIndex(seat => !seat);
      }
      this.service.flight.seats[ticket.row][ticket.seat] = ticket.passenger.passport;
      this.freeRows = this.service.flight.seats
        .map((row, index) => index)
        .filter(rowIndex => this.service.flight.seats[rowIndex].some(seat => !seat));
    }
  }

  changePassengersNumber() {
    if (this.passengers > this.service.newTickets.length) {
      this.service.newTickets.push(new Ticket());
      this.AddNewPassengerForm();
      this.changePassengersNumber();
    } else if (this.passengers < this.service.newTickets.length) {
      this.service.newTickets.pop();
      this.removePassengerForm();
      this.changePassengersNumber();
    }
  }

  isThereUsers(): boolean {
    return this.passengersForms.getRawValue().some(passenger =>
      passenger.hebrew_name != '' &&
      passenger.english_name != '' &&
      passenger.passport != '');
  }

  asFormGroup(val): FormGroup { return val; }

  saveData() {
    if (this.passengersForms.invalid) return;

    let user_name;
    let promises = [];
    this.service.newTickets.forEach(
      (ticket, index) => {
        const rawPassenger = this.passengersForms.getRawValue()[index];
        ticket.passenger = rawPassenger;
        ticket.passenger.passport = parseInt(rawPassenger.passport);
        promises.push(this.service.getPassenger(ticket.passenger.passport)
          .toPromise()
          .then(
            results => {
              if (results != null) {
                ticket.passenger_passport = ticket.passenger.passport;
                ticket.passenger = null;
              }
              return 'pass'
            },
            err => {
              console.error(err);
            }
          )
        )
      }
    );
    Promise.all(promises).then(
      data => {
        this.service.newTickets = this.service.newTickets
          .filter(ticket =>
            ticket.passenger_passport != null ||
            (ticket.passenger.hebrew_name != '' &&
              ticket.passenger.english_name != '' &&
              ticket.passenger.passport != null));

        this.appService.authenticate().then(
          res => {
            if (res != 'fail') {
              user_name = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).name;
            }
          },
          err => console.log(err.error)
        ).finally(() =>
          this.dialog.open(
            DialogComponent,
            { data: user_name, disableClose: true, autoFocus: false }
          ).afterClosed().subscribe(
            data => {
              if (data != 'cancel') {
                this.service.navigate('finish')
              }
            },
            err => {
              console.error('אין משתמש מחובר');
            }
          )
        )
      }
    )
  }
}