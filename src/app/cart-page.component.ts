import {Component, Input, OnInit} from '@angular/core';
import {Cart} from './cart'
import {CartService} from "./cart.service";
import 'rxjs/add/operator/pluck';
import {state, trigger, style, animate, transition, keyframes} from "@angular/animations";

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(375)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  providers: [CartService]
})
export class CartPageComponent implements OnInit {
  cart: Cart;
  cartItems: Cart[];
  subTotal = 0;
  tax: number;
  total: number;
  payPal: number;
  empty: boolean;
  cartAnimate = 'out';
  emptyCartTxt = 'in';


  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.changes
      .subscribe((data: any) => {
        this.cartItems = data.cart;
        this.subTotal = data.total;
        this.tax = data.total * .04;
        this.total = data.total + this.tax;
        this.isEmpty(this.cartItems);
        this.payPal = +this.total.toFixed(2);
      });
  }

  isEmpty(cart: any) {
    if (cart.length > 0) {
      this.empty = false;
      this.cartAnimate = 'in';
      this.emptyCartTxt = 'out';
    }
    else {
      this.empty = true;
      this.cartAnimate = 'out';
      this.emptyCartTxt = 'in';
    }
  }

  purchase() {
    this.cartService.clearOrder();
  }

  removeFromCart(id: any) {
    this.cartService.deleteFromCart(id);
  }
}
