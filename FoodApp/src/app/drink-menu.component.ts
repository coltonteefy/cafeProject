import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";
import {Http} from "@angular/http";
import {state, trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-drink-menu',
  templateUrl: './drink-menu.component.html',
  styleUrls: ['./drink-menu.component.css'],
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
export class DrinkMenuComponent implements OnInit {
  quantitySelect = [
    {num: 0}, {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5},
    {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11},
    {num: 12}, {num: 13}, {num: 14}, {num: 15}
  ];

  @Input()
  cart: Cart;
  @Input()
  kitchen: Kitchen;

  // tslint:disable-next-line:no-bitwise
  private randomNumber = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  private randomLetter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  private cartId;

  innerWidth: number;
  newQuantity: any = [];
  multiOrderIndex: number;
  originalPrice: number;
  // totalPrice = 0;
  // cartItems:Cart[];
  multipleDrinkPrice = 0;
  quantity = 0;
  List;
  twoLiterDrinkList;
  twentyOzDrinkList;

  // animation triggers
  twoLitersIn = 'in';
  twentyOzIn = 'out';

  // determine drink size list selection
  allTwoLitersOpen: boolean = true;
  allTwentyOzOpen: boolean = false;


  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private kitchenService: KitchenService,
              private http: Http) {
  }

  ngOnInit() {

    fetch('assets/static-content/menu-list.json')
      .then(async res => {
        const response = await res.json();
        this.twoLiterDrinkList = response.twoLiterDrinkList;
        this.twentyOzDrinkList = response.twentyOzDrinkList;
      });

    // this.http.get('/assets/static-content/menu-list.json')
    //   .map(res => res.json())
    //   .subscribe(data => {
    //     this.twoLiterDrinkList = data.twoLiterDrinkList;
    //     this.twentyOzDrinkList = data.twentyOzDrinkList;
    //   });
    //
    // this.cartService.changes
    //   .subscribe(data => {
    //     this.cart = data;
    //   })
  }

  // add items to cart and kitchen
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
    // this.quantity = 0;
  }

  twoLitersOpen() {
    this.allTwoLitersOpen = true;
    this.allTwentyOzOpen = false;

    this.twoLitersIn = 'in';
    this.twentyOzIn = 'out';
  }

  twentyOzOpen() {
    this.allTwoLitersOpen = false;
    this.allTwentyOzOpen = true;

    this.twoLitersIn = 'out';
    this.twentyOzIn = 'in';
  }

  addQuantity(price: number, index: number) {
    this.quantity++;
    price = price * this.quantity;
    this.multipleDrinkPrice = price;
  }

  minusQuantity(price: number) {
    if (this.quantity > 0) {
      this.quantity--;
      price = price * this.quantity;
      this.multipleDrinkPrice = price;
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

