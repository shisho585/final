import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { OrdersService } from '../orders.service';
import { Order } from 'src/app/models/order';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {

  paypalScriptLoaded = false;
  loggedIn = false;

  constructor(
    public service: OrdersService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.initConfig();

    if (this.service.flight == undefined) {
      this.service.navigateToHome();
    }
  }

  public payPalConfig?: IPayPalConfig;

  saveOrder() {
    this.service.createOrder(this.service.prepareOrder()).subscribe(
      (order: Order) => {
        console.log(order);
        
        this.appService.closeAll();
        this.service.order = order;
        this.service.navigate('done');
      },
      error => {
        const headerError = "השגיאות הבאות התרחשו במהלך השמירה";
        const messageError = error.error.message.toString().replaceAll(',', '\n');
        this.appService.openMessageDialog(messageError, headerError);
      }
    )
  }

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
              name: 'כרטיסי טיסה לטיסה ' + this.service.flight.flight_no,
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
        this.appService.openMessageDialog('הזמנך נקלטה והיא מאושרת ברגעים אלה\nאל תסגור את החלון', null, true);
        // actions.order.get().then(details => {
        //   console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });
      },
      onClientAuthorization: (data) => {
        this.saveOrder();
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
      },
      onError: err => {
        // console.log('OnError', err);
      },
      onClick: (data, actions) => {
        // this.demoSave();
      },
    };
  }
}