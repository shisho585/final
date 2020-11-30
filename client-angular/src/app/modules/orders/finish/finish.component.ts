import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { OrdersService } from '../orders.service';
import { Ticket } from 'src/app/models/ticket';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { finalize } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  freeRows: number[];
  paypalScriptLoaded = false;
  loggedIn = false;

  constructor(
    private dialog: MatDialog,
    public service: OrdersService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initConfig();

    if (this.service.flight == undefined) {
      this.service.navigateToHome();
    }

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

  demoSave() {
    let user_name;
    this.appService.authenticate().pipe(
      finalize(() => {
        this.dialog.open(
          DialogComponent,
          { data: user_name, disableClose: true, autoFocus: false }
        ).afterClosed().subscribe(
          data => {
            if (data != 'cancel') {
              const order = new Order();
              order.user_email = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email;
              order.seats_chosen = this.service.chosenSeats;

              this.service.newTickets.forEach(ticket => {
                ticket.flight_number = this.service.flight.number;
                order.tickets.push(ticket);
              });

              this.service.createOrder(order).subscribe(
                () => {
                  this.service.navigate('done');
                },
                error => {
                  const headerError = "השגיאות הבאות התרחשו במהלך השמירה";
                  const messageError = error.error.message.toString().replaceAll(',', '\n');
                  this.appService.openMessageDialog(messageError, headerError);
                }
              )
            }
          },
          err => {
            console.error('אין משתמש מחובר');
          }
        )
      })
    ).subscribe(
      res => {
        if (res != 'fail') {
          user_name = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).name;
        }
      },
      err => console.log(err.error)
    )
  }

  public payPalConfig?: IPayPalConfig;

  private initConfig(): void {
    this.payPalConfig = {
      onInit: (data, actions) => { },
      currency: 'ILS',
      clientId: 'ASfYbynM-7Hv5IWS4aJ3Xqp_airF8ef6ujn0jkB97J_gUaRyIW1rAVWsmIyJDtNRWCNCT6r3HfscyYKX',
      createOrderOnClient: () => {
        let data: ICreateOrderRequest = {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'ILS',
              value: (this.service.flight.price * this.service.newTickets.length + this.service.chosenSeats * 20).toString(),
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: (this.service.flight.price * this.service.newTickets.length + this.service.chosenSeats * 20).toString()
                }
              }
            },
            items: [{
              name: 'כרטיסי טיסה לטיסה ' + this.service.flight.number,
              quantity: this.service.newTickets.length.toString(),
              unit_amount: {
                currency_code: 'ILS',
                value: this.service.flight.price.toString()
              },
            }]
          }]
        }
        if (this.service.chosenSeats > 0) {
          data.purchase_units[0].items.push({
            name: 'תוספת מושבים',
            quantity: this.service.chosenSeats.toString(),
            unit_amount: {
              currency_code: 'ILS',
              value: '20'
            }
          });
        }
        return data;
      },
      advanced: {
        commit: 'true'
      },
      style: {
        shape: 'pill',
        color: 'blue',
        layout: 'vertical',
        label: 'pay',
      },
      onApprove: (data, actions) => {
        this.appService.openMessageDialog('הזמנך נקלטה והיא מאושרת ברגעים אלה\nאל תסגור את החלון');
        // actions.order.get().then(details => {
        //   console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });
      },
      onClientAuthorization: (data) => { },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
      },
      onError: err => {
        // console.log('OnError', err);
      },
      onClick: (data, actions) => {
        this.demoSave();
      },
    };
  }
}