import {Component, OnInit} from '@angular/core';
import { DialogComponent } from './dialog.component';


@Component({
  selector: 'lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.css'],
  providers: [DialogComponent]
})
export class LunchMenuComponent implements OnInit {

  innerWidth: number;
  cartId = 0;

  public totalPrice = 0;
  public cart = [];
  public burgerList = [
    {
      name: 'Original Burger',
      description: 'Beef patty with tomato, lettuce, onion and pickles',
      image: 'https://s-media-cache-ak0.pinimg.com/736x/fb/1a/11/fb1a11c661910352dc5d1b988aceb8cf--angus-burger-food-menu.jpg',
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

  constructor() {
  }

  ngOnInit() {

  }

  addToCart(name: string, price: number, id: number) {
    id = this.cartId;
    this.cart.push({name, price, id});

    this.totalPrice = Math.round((this.totalPrice + price)*100)/100;
    this.cartId++;
  }

  removeFromCart(id: number, price:number) {
    if(this.totalPrice > 0){
      this.totalPrice = Math.round((this.totalPrice - price)*100)/100;
    }
    this.cart = this.cart.filter(item => item.id !== id);
  }


  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //
  //   if (pageYOffset >= 575) {
  //     this.renderer2.addClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
  //   }
  //   else {
  //     this.renderer2.removeClass(this.el.nativeElement.querySelector('#cartID'), 'cart-stick');
  //   }
  // }
}
