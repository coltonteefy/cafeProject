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
  totalCost = this.cartService.totalSum;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.changes
      .pluck('cart')
      .subscribe((data: any[]) => {
        this.cartItems = data;
      })
  }



  purchase() {
    this.cartService.clearOrder();
  }

  removeFromCart(id: any) {
    this.cartService.deleteFromCart(id);

    console.log(this.cartService.getTotal());
  }

}
