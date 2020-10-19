import {
  Component,
  OnInit
} from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'ILS',
      clientId: 'ASfYbynM-7Hv5IWS4aJ3Xqp_airF8ef6ujn0jkB97J_gUaRyIW1rAVWsmIyJDtNRWCNCT6r3HfscyYKX',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'ILS',
            value: '20',
            breakdown: {
              item_total: {
                currency_code: 'ILS',
                value: '20'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'ILS',
              value: '10',
            },
          },{
            name: 'Enterprise Subscription',
            quantity: '2',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'ILS',
              value: '5',
            },
          }]
        }]
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
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}