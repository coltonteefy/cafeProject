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
  totalPrice = 0;
  cartItems: Cart[];

  constructor(private cartService: CartService) { }

  getCart(): void {
    // this.cartService.getCart().then(cart => this.cartItems = cart);
  }

  ngOnInit() {
    this.cartService.changes
      .pluck('cart')
      .subscribe((data: any[]) => {
        debugger;
        this.cartItems = data;
      })
  }

  purchase(){
    console.log("purchase works");
  }

}
