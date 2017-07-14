import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import { DialogComponent } from './dialog.component';
import {CartService} from "./cart.service";
import {Cart} from "./cart";
import {Http} from "@angular/http";


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
  burgerList;
  pizzaList;


  // public burgerList = [
  //   {
  //     name: 'Original Burger',
  //     description: 'Beef patty with tomato, lettuce, onion and pickles',
  //     image: 'http://img1.cookinglight.timeinc.net/sites/default/files/styles/300x300/public/image/2015/06/main/oh3959p159-simple-brisket-burgers.jpg?itok=_7dY5E5R',
  //     price: 4.99
  //   },
  //   {
  //     name: 'Southwest Burger',
  //     description: 'Beef patty with homemade salsa, avocado, lettuce, tomato and pepper jack cheese',
  //     image: 'https://www.valleynaturalfoods.com/wp-content/uploads/2013/11/Southwest-Bison-Burger-300x300.jpg',
  //     price: 6.99
  //   },
  //   {
  //     name: 'Bacon BBQ Burger',
  //     description: 'Beef patty with sweet and tangy bbq sauce, crispy bacon, cheddar cheese, lettuce, onion ring and jalapeno',
  //     image: 'https://imagesapt.apontador-assets.com/fit-in/640x480/00ae021ce9744db8ab6d68f0b6bc3597/applebees--shopping-morumbi.jpg',
  //     price: 7.49
  //   },
  //   {
  //     name: 'Buffalo Burger',
  //     description: 'Beef patty with buffalo sauce, crumbled blue cheese crumbles,arugula, caramelized onion, and cheddar cheese',
  //     image: 'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/exps174853_SD153320B12_09_4b.jpg',
  //     price: 6.99
  //   }
  // ];

  // public pizzaList = [
  //   {
  //     name: 'Cheese',
  //     description: 'Cheese and tomato sauce',
  //     image: 'https://s3-ca-central-1.amazonaws.com/urteksolutions/res.urtek.ca/assets/uploads/2015/04/1019882-300x300.jpg',
  //     price: 6.50
  //   },
  //   {
  //     name: 'Pepperoni',
  //     description: 'Cheese and pepperoni',
  //     image: 'https://d104wv11b7o3gc.cloudfront.net/wp-content/uploads/2016/03/low-carb-pepperoni-pizza-5-300x300.jpg',
  //     price: 6.50
  //   },
  //   {
  //     name: 'BBQ Chicken',
  //     description: 'BBQ base, cheese, grilled chicken, onion, and green peppers',
  //     image: 'http://img.sndimg.com/food/image/upload/h_422,w_562,c_fit/v1/img/recipes/62/77/5/q3aIFlQC6nYPNGRxMqA5_pz3.jpg',
  //     price: 6.50
  //   },
  //   {
  //     name: 'Supreme',
  //     description: 'Pepperoni, ham, beef, pork sausage, Italian sausage, red onions, mushrooms, green peppers and black olives',
  //     image: 'http://www.flaminrooster.com/wp-content/uploads/2016/11/pizzas1-300x300.jpg',
  //     price: 6.50
  //   },
  //   {
  //     name: 'Hawaiian',
  //     description: 'Ham, bacon, and pineapple',
  //     image: 'http://starpizzacanton.com/wp-content/uploads/2017/04/Hawaiian-Pizza-1-300x300.jpg',
  //     price: 6.50
  //   }
  // ];

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private http: Http) {
  }

  // getCart(): void {
  //   this.cartService.getCart().then(cart => this.cartItems = cart);
  // }

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
