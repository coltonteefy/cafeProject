import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import { DialogComponent } from './dialog.component';
import {CartService} from "./cart.service";
import {Cart} from "./cart";


@Component({
  selector: 'lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.css'],
  providers: [DialogComponent, CartService]
})
export class LunchMenuComponent implements OnInit {
  @Input() cart: Cart;
  innerWidth: number;
  cartId = 0;

  totalPrice = 0;
  cartItems: Cart[];
  public burgerList = [
    {
      name: 'Original Burger',
      description: 'Beef patty with tomato, lettuce, onion and pickles',
      image: 'http://img1.cookinglight.timeinc.net/sites/default/files/styles/300x300/public/image/2015/06/main/oh3959p159-simple-brisket-burgers.jpg?itok=_7dY5E5R',
      price: 4.99
    },
    {
      name: 'Southwest Burger',
      description: 'Beef patty with homemade salsa, avocado, lettuce, tomato and pepper jack cheese',
      image: 'https://www.valleynaturalfoods.com/wp-content/uploads/2013/11/Southwest-Bison-Burger-300x300.jpg',
      price: 6.99
    },
    {
      name: 'Bacon BBQ Burger',
      description: 'Beef patty with sweet and tangy bbq sauce, crispy bacon, cheddar cheese, lettuce, onion ring and jalapeno',
      image: 'https://imagesapt.apontador-assets.com/fit-in/640x480/00ae021ce9744db8ab6d68f0b6bc3597/applebees--shopping-morumbi.jpg',
      price: 7.49
    },
    {
      name: 'Buffalo Burger',
      description: 'Beef patty with buffalo sauce, crumbled blue cheese crumbles,arugula, caramelized onion, and cheddar cheese',
      image: 'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/exps174853_SD153320B12_09_4b.jpg',
      price: 6.99
    }
  ];

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService) {
  }

  // getCart(): void {
  //   this.cartService.getCart().then(cart => this.cartItems = cart);
  // }

  ngOnInit() {
    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      })
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.innerWidth = innerWidth;

    if (pageYOffset > 600) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
    }else
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
  }

  addToCart(name: string, price: number) {
    this.cartService.addToCart({name:name, price:price, id:this.cartId});
    this.cartId++;
  }
}
