import {Component, Input, OnInit} from '@angular/core';
import {Cart} from './cart'
import {CartService} from './cart.service';
import 'rxjs/add/operator/pluck';
import {state, trigger, style, animate, transition, keyframes} from '@angular/animations';
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";

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
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 1.0})
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
  providers: [CartService, KitchenService]
})
export class CartPageComponent implements OnInit {
  private randomNumber = (((1 + Math.random()) * 0x10000) | 0);
  private id;

  cart:Cart;
  cartItems:Cart[];
  kitchen:Kitchen;
  kitchenItems:Kitchen[];
  subTotal = 0;
  tax:number;
  total:number;
  payPal:number;
  empty:boolean;
  cartAnimate = 'out';
  emptyCartTxt = 'in';
  printNum = 0;
  tmpId = this.id;


  constructor(private cartService:CartService,
              private kitchenService:KitchenService) {
  }

  ngOnInit() {
    this.cartService.changes
      .subscribe((data:any) => {
        this.cartItems = data.cart;
        this.subTotal = data.total;
        this.tax = data.total * .04;
        this.total = +data.total + this.tax;
        this.isEmpty(this.cartItems);
        this.payPal = +this.total.toFixed(2);
      });
  }

  isEmpty(cart:any) {
    if (cart.length > 0) {
      this.empty = false;
      this.cartAnimate = 'in';
      this.emptyCartTxt = 'out';
    } else {
      this.empty = true;
      this.cartAnimate = 'out';
      this.emptyCartTxt = 'in';
    }
  }

  purchase() {
    this.id = this.randomNumber.toString();
    //
    // this.kitchenService.addToKitchen({
    //   id: this.id
    // });

    for (let i = 0; i < this.cartService.store.value.cart.length; i++) {

      this.kitchenService.addToKitchen({
        orderTracker: this.printNum,
        name: this.cartService.store.value.cart[i].name,
        id: this.id,
        quantity: this.cartService.store.value.cart[i].quantity,
        description: this.cartService.store.value.cart[i].description
      });
      this.printNum++;
    }
    // this.kitchenService.addToKitchen({
    //   name: this.cartService.store.value.cart.map(item => item.name),
    //   id: this.id,
    //   quantity: this.cartService.store.value.cart.map(item => item.quantity),
    //   description: this.cartService.store.value.cart.map(item => item.description)
    // });

    this.randomNumber = (((1 + Math.random()) * 0x10000) | 0);
    this.cartService.clearOrder();
  }

  clearCart() {
    this.cartService.clearOrder();
  }

  removeFromCart(id:any) {
    this.cartService.deleteFromCart(id);
  }

  quantityUp(name:string) {
    let index:any;
    let origPrice:any;

    index = this.cartItems.map(item => item.name).indexOf(name);
    origPrice = this.cartService.store.value.cart[index].price / this.cartService.store.value.cart[index].quantity;

    this.cartService.store.value.cart[index].quantity++;
    this.cartService.store.value.cart[index].price += origPrice;
    this.cartService.updateCartQuantityAndPrice(index, this.cartService.store.value.cart[index].quantity, this.cartService.store.value.cart[index].price)

  }

  quantityDown(name:string) {
    let index:any;
    let origPrice:any;
    index = this.cartItems.map(item => item.name).indexOf(name);
    origPrice = this.cartService.store.value.cart[index].price / this.cartService.store.value.cart[index].quantity;

    if (this.cartService.store.value.cart[index].quantity > 1) {
      this.cartService.store.value.cart[index].quantity--;
      this.cartService.store.value.cart[index].price -= origPrice;
    }

    this.cartService.updateCartQuantityAndPrice(index, this.cartService.store.value.cart[index].quantity, this.cartService.store.value.cart[index].price)
  }
}
