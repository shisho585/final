import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { OrdersService, Person } from '../orders.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  freeRows: number[];
  freeSeatsForRow: string[];

  tel: string;
  email: string;

  seatsNumber: number = 0;

  constructor(public service: OrdersService) {
    this.freeRows = service.flight.seats.map((row, index) => index).filter(rowIndex => service.flight.seats[rowIndex].some(seat => !seat));
  }

  clearChoises(person: Person) {
    this.releaseSeat(person);
    person.selectedRow = null;
    person.selectedSeat = null;
  }

  releaseSeat(person: Person) {
    if (Number.isInteger(person.selectedRow) && Number.isInteger(person.selectedSeat)) {
      this.service.flight.seats[person.selectedRow][person.selectedSeat] = false;
      this.seatsNumber--;
      console.log(person.selectedRow + "," + person.selectedSeat + ". realese");
    }
  }

  catchSeat(person: Person) {
    if (Number.isInteger(person.selectedRow) && Number.isInteger(person.selectedSeat)) {
      this.seatsNumber++;
      this.service.flight.seats[person.selectedRow][person.selectedSeat] = true;
      console.log(person.selectedRow + "," + person.selectedSeat + ". taken");
      this.tel.match(/^\d+$/)
    }
  }

  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
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
              value: (this.service.flight.cost * this.service.persons.length + this.seatsNumber * 20).toString(),
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: (this.service.flight.cost * this.service.persons.length + this.seatsNumber * 20).toString()
                }
              }
            },
            items: [{
              name: 'כרטיסי טיסה',
              quantity: this.service.persons.length.toString(),
              unit_amount: {
                currency_code: 'ILS',
                value: this.service.flight.cost.toString()
              },
            }]
          }]
        }
        if (this.seatsNumber > 0) {
          data.purchase_units[0].items.push({
            name: 'מושבים',
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
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {

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