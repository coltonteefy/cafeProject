import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {Http} from "@angular/http";
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";
import {state, trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.css'],
  providers: [CartService],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(375)
      ]),
      transition('* => void', [
        animate(320, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class SaladsComponent implements OnInit {
  quantitySelect = [
    {num: 0}, {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5},
    {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11},
    {num: 12}, {num: 13}, {num: 14}, {num: 15}
  ];

  @Input()
  cart: Cart;
  @Input()
  kitchen: Kitchen;

  private randomNumber = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  private randomLetter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  private cartId;

  innerWidth: number;
  quantity = 0;
  newQuantity: any = [];
  multiOrderIndex: number;
  originalPrice: number;
  saladIn = 'in';
  saladsList;

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private kitchenService: KitchenService,
              private http: Http) {
  }

  ngOnInit() {
    this.http.get('/assets/static-content/menu-list.json')
      .map(res => res.json())
      .subscribe(data => {
        this.saladsList = data.saladsList;
      });

    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      })
  }

  addToCart(name: string, description: string, price: number, quantity: number) {
    this.cartId = this.randomLetter.concat(this.randomNumber.toString());

    if (this.quantity >= 1) {
      this.originalPrice = price;
      price = price * this.quantity;
      quantity = this.quantity;

      if (this.cartService.store.value.cart.map(item => item.name).includes(name) && this.cartService.store.value.cart.map(item => item.description).includes(description)) {
        this.newQuantity = [];
        this.multiOrderIndex = this.cartService.store.value.cart.map(item => item.name).indexOf(name.toString());
        this.newQuantity.push(quantity);
        this.newQuantity.push(this.cartService.store.value.cart[this.multiOrderIndex].quantity);
        price = this.originalPrice * this.newQuantity.reduce(this.getSum);
        this.cartService.updateCartQuantityAndPrice(this.multiOrderIndex, this.newQuantity.reduce(this.getSum), price);
      } else
        this.cartService.addToCart({
          name: name,
          description: description,
          price: price,
          id: this.cartId,
          quantity: quantity
        });
      // this.kitchenService.addToKitchen({name: name, id: this.cartId, quantity: quantity});
      this.randomNumber = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      this.randomLetter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }
  }

  // event handler for the select element's change event
  selectChangeHandler(event: any) {
    // update the ui
    this.quantity = event.target.value;
  }

  getSum(total, num) {
    return parseInt(total) + parseInt(num);
  }
}
