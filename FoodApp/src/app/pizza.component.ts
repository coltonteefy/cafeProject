import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, Output, EventEmitter} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {Http} from "@angular/http";
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";
import {state, trigger, style, animate, transition} from '@angular/animations';

// import {access} from "fs";

@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css'],
  providers: [DialogComponent, CartService, KitchenService],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(800)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class PizzaComponent implements OnInit {
  quantitySelect = [
    {num: 0}, {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5},
    {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10}, {num: 11},
    {num: 12}, {num: 13}, {num: 14}, {num: 15}
  ];

  @Input()
  cart: Cart;
  @Input()
  kitchen: Kitchen;
  @Input()
  visible: boolean;
  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private randomNumber = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  private randomLetter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  private cartId;

  innerWidth: number;
  quantity = 0;
  newQuantity: any = [];
  multiOrderIndex: number;
  originalPrice: number;
  size: string = 'small';

  // determine pizza list selection
  allPizza: boolean = true;
  allMeats: boolean = false;
  allChicken: boolean = false;
  allVeggies: boolean = false;

  // animation triggers
  allIn = 'in';
  meatsIn = 'out';
  chickenIn = 'out';
  veggiesIn = 'out';

  // variables used to create menu lists for binding
  pizzaList;
  meatsList;
  chickenList;
  veggiesList;


  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private kitchenService: KitchenService,
              private http: Http) {
  }

  ngOnInit() {
    // access all the pizza lists in menu-list
    this.http.get('/assets/static-content/menu-list.json')
      .map(res => res.json())
      .subscribe(data => {
        this.pizzaList = data.pizzaList;
        this.meatsList = data.meatsList;
        this.chickenList = data.chickenList;
        this.veggiesList = data.veggiesList;
      });

    // getting cart service data for cart
    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      });

    // getting cart service data for cart
    this.kitchenService.changes
      .subscribe(data => {
        this.kitchen = data;
      });
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

      this.randomNumber = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      this.randomLetter = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }
  }

  open() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  allPizzaOpen() {
    this.allPizza = true;
    this.allMeats = false;
    this.allChicken = false;
    this.allVeggies = false;

    this.allIn = 'in';
    this.meatsIn = 'out';
    this.chickenIn = 'out';
    this.veggiesIn = 'out';
  }

  allMeatsOpen() {
    this.allPizza = false;
    this.allMeats = true;
    this.allChicken = false;
    this.allVeggies = false;

    this.allIn = 'out';
    this.meatsIn = 'in';
    this.chickenIn = 'out';
    this.veggiesIn = 'out';
  }

  allChickenOpen() {
    this.allPizza = false;
    this.allMeats = false;
    this.allChicken = true;
    this.allVeggies = false;

    this.allIn = 'out';
    this.meatsIn = 'out';
    this.chickenIn = 'in';
    this.veggiesIn = 'out';
  }

  allVeggiesOpen() {
    this.allPizza = false;
    this.allMeats = false;
    this.allChicken = false;
    this.allVeggies = true;

    this.allIn = 'out';
    this.meatsIn = 'out';
    this.chickenIn = 'out';
    this.veggiesIn = 'in';
  }

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.quantity = event.target.value;
  }

  getSum(total, num) {
    return parseInt(total) + parseInt(num);
  }

  smallSelect() {
    this.size = 'small';
    console.log(this.size);
  }

  mediumSelect() {
    this.size = 'medium';
    console.log(this.size);
  }

  largeSelect() {
    this.size = 'large';
    console.log(this.size);
  }

}
