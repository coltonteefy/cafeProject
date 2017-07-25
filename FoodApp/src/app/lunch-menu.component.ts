import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {Http} from "@angular/http";
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";

@Component({
  selector: 'lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.css'],
  providers: [DialogComponent, CartService, KitchenService]
})
export class LunchMenuComponent implements OnInit {
  @Input() cart: Cart;
  @Input() kitchen: Kitchen;
  innerWidth: number;
  cartId = 0;

  // totalPrice = 0;
  // cartItems: Cart[];
  burgerList;
  pizzaList;

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private kitchenService: KitchenService,
              private http: Http) {
  }

  ngOnInit() {
    this.http.get('assets/static-content/menu-list.json')
      .map(res => res.json())
      .subscribe(data => {
        this.burgerList = data.burgerList;
        this.pizzaList = data.pizzaList;
      });

    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      });

    this.kitchenService.changes
      .subscribe(data => {
        this.kitchen = data;
      });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.innerWidth = innerWidth;

    if (pageYOffset > 625) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
    } else {
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
    }
  }

  addToCart(name: string, price: number) {
    this.cartService.addToCart({name: name, price: price, id: this.cartId});
    this.kitchenService.addToKitchen({name: name, id: this.cartId});
    this.cartId++;
  }
}
