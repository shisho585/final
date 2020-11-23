import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { OrdersService } from '../orders.service';
import { Ticket } from 'src/app/models/ticket';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  freeRows: number[];

  tel: string;
  email: string;

  seatsNumber = 0;

  constructor(public service: OrdersService, private router: Router, private http: HttpClient) {
    console.log(service.tickets);

    if (service.flight == undefined) {
      router.navigate(['orders', 'pick-a-flight'])
    }

    for (let index = 0; index < service.flight.plain.number_of_rows; index++) {
      for (let indexB = 0; indexB < service.flight.plain.seats_to_row; indexB++) {
        service.flight.seats[index][indexB] = null;
      }
    }
    service.flight.tickets.forEach(ticket => {
      service.flight.seats[ticket.row][ticket.seat] = ticket.user_id;
    })

    this.freeRows = service.flight.seats
      .map((row, index) => index)
      .filter(rowIndex => service.flight.seats[rowIndex].some(seat => !seat));
  }

  clearChoises(ticket: Ticket) {
    this.releaseSeat(ticket);
    ticket.row = null;
    ticket.seat = null;
  }

  releaseSeat(ticket: Ticket) {
    if (Number.isInteger(ticket.row) && Number.isInteger(ticket.seat)) {
      this.service.flight.seats[ticket.seat][ticket.seat] = null;
      this.seatsNumber--;
      console.log(ticket.row + "," + ticket.seat + ". realese");
      this.freeRows = this.service.flight.seats.map((row, index) => index).filter(rowIndex => this.service.flight.seats[rowIndex].some(seat => !seat));
    }
  }

  catchSeat(ticket: Ticket) {
    if (Number.isInteger(ticket.row) && Number.isInteger(ticket.seat)) {
      this.seatsNumber++;
      if (this.service.flight.seats[ticket.row][ticket.seat]) {
        ticket.seat = this.service.flight.seats[ticket.row].findIndex(seat => !seat);
      }
      this.service.flight.seats[ticket.row][ticket.seat] = ticket.user.passport_id;
      this.freeRows = this.service.flight.seats.map((row, index) => index).filter(rowIndex => this.service.flight.seats[rowIndex].some(seat => !seat));
      console.log(ticket.row + "," + ticket.seat + ". taken");
    }
  }

  public payPalConfig?: IPayPalConfig;

  demoSave() {
    this.service.tickets.forEach(ticket => {
      ticket.flight_number = this.service.flight.number;
      // this.service.flight.seats.forEach((row, rowIndex) => {
      //   row.forEach((seat, seatIndex) => {
      //     if (!seat) {
      //       seat = ticket.user.passport_id;
      //       ticket.row = rowIndex;
      //       ticket.seat = seatIndex;
      //     }
      //   })
      // })
      for (let rowIndex = 0; rowIndex < this.service.flight.seats.length; rowIndex++) {
        console.log(rowIndex);
        console.log(ticket.seat);
        if (!ticket.seat) {
          for (let seatIndex = 0; seatIndex < this.service.flight.seats[rowIndex].length; seatIndex++) {
            if (!this.service.flight.seats[rowIndex][seatIndex]) {
              this.service.flight.seats[rowIndex][seatIndex] = ticket.user.passport_id;
              ticket.row = rowIndex;
              ticket.seat = seatIndex;
              break;
            }
          }
        } else {
          break;
        }
      }
    });
    this.http.post('http://localhost:3000/api/ticket', this.service.tickets).subscribe(
      data => this.router.navigate(['orders', 'done'])
    )
  }

  ngOnInit(): void {
    this.initConfig();
  }

  paypalScriptLoaded = false;
  done() {
    this.paypalScriptLoaded = true;
  }

  private initConfig(): void {
    this.payPalConfig = {
      onInit: (data, actions) => {
        actions.disable();
        document.querySelectorAll("input").forEach((item) => item.addEventListener('change', () => {
          if (/^\d+$/.test(this.tel) && this.email.length > 0) {
            actions.enable();
          }
        }));
      },
      currency: 'ILS',
      clientId: 'ASfYbynM-7Hv5IWS4aJ3Xqp_airF8ef6ujn0jkB97J_gUaRyIW1rAVWsmIyJDtNRWCNCT6r3HfscyYKX',
      createOrderOnClient: () => {
        let data: ICreateOrderRequest = {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'ILS',
              value: (this.service.flight.price * this.service.tickets.length + this.seatsNumber * 20).toString(),
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: (this.service.flight.price * this.service.tickets.length + this.seatsNumber * 20).toString()
                }
              }
            },
            items: [{
              name: 'כרטיסי טיסה לטיסה ' + this.service.flight.number,
              quantity: this.service.tickets.length.toString(),
              unit_amount: {
                currency_code: 'ILS',
                value: this.service.flight.price.toString()
              },
            }]
          }]
        }
        if (this.seatsNumber > 0) {
          data.purchase_units[0].items.push({
            name: 'תוספת מושבים',
            quantity: this.seatsNumber.toString(),
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
        alert('הזמנך נקלטה והיא מאושרת ברגעים אלה. אל תסגור את החלון');
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        this.http.post('http://localhost:3000/api/ticket', this.service.tickets).subscribe(
          data => this.router.navigate(['orders', 'done'])
        )
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        if (!(/^\d+$/.test(this.tel) && this.email.length > 0)) {
          alert('שים לב אין לך פרטים ליצירת קשר, בלי זה לא תוכל להזמין את הטיסה');
        }
      },
    };
  }
}