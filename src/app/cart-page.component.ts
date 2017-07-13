import {Component, Input, OnInit} from '@angular/core';
import {Cart} from './cart'
import {CartService} from "./cart.service";
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
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
    }
    else
      this.empty = true;
  }

  purchase() {
    this.cartService.clearOrder();
  }

  removeFromCart(id: any) {
    this.cartService.deleteFromCart(id);
  }
}
