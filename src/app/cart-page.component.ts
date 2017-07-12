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
  totalCost = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.changes
      .subscribe((data: any) => {
        this.cartItems = data.cart;
        this.totalCost = data.total
      })
  }

  purchase() {
    this.cartService.clearOrder();
  }

  removeFromCart(id: any) {
    this.cartService.deleteFromCart(id);
  }

}
