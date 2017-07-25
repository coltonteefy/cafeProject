import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {Http} from "@angular/http";

@Component({
  selector: 'app-drink-menu',
  templateUrl: './drink-menu.component.html',
  styleUrls: ['./drink-menu.component.css']
})
export class DrinkMenuComponent implements OnInit {
  @Input() cart: Cart;
  innerWidth: number;
  cartId = 0;

  totalPrice = 0;
  cartItems: Cart[];
  List;
  hotDrinksList;
  bottleList;
  fountainDrinks;

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private http: Http) {
  }

  ngOnInit() {
    this.http.get('assets/static-content/menu-list.json')
      .map(res => res.json())
      .subscribe(data => {
        this.hotDrinksList = data.hotDrinksList;
        this.bottleList = data.bottleList;
        this.fountainDrinks = data.fountainDrinks;
      });

    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      })
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.innerWidth = innerWidth;

    if (pageYOffset > 625) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
    }else
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
  }

  addToCart(name: string, price: number) {
    this.cartService.addToCart({name:name, price:price, id:this.cartId});
    this.cartId++;
  }
}

