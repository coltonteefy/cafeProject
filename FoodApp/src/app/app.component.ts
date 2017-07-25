import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {Cart} from './cart';
import {CartService} from './cart.service';
import {UserService} from "./services/user.service";
import {KitchenService} from "./kitchen.service";
import {Kitchen} from "./kitchen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CartService, KitchenService]
})
export class AppComponent implements OnInit {
  cart: Cart[];
  kitchen: Kitchen[];

  title = 'app';
  innerWidth: number;

  constructor(private renderer2: Renderer2,
              private el: ElementRef,
              private cartService: CartService,
              private kitchenService: KitchenService,
              private userService: UserService) {
  }


  getCart(): void {
    this.cartService.getCart().then(cart => {
    });
  }

  ngOnInit() {
    this.cartService.changes
      .subscribe(data => {
        this.cart = data;
      });

    this.kitchenService.changes
      .subscribe(data => {
        this.kitchen = data;
      })

    // this.userService.createUser()
    //   .subscribe(data => {
    //     debugger;
    //   })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.innerWidth = innerWidth;

    if (pageYOffset > 20) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'show');
    } else {
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'show');
    }

    if (pageYOffset >= 520) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
      this.renderer2.addClass(this.el.nativeElement.querySelector('#body'), 'body-up');
      this.renderer2.addClass(this.el.nativeElement.querySelector('#head'), 'header-change');
    } else {
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#body'), 'body-up');
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#head'), 'header-change');
    }

    if (this.innerWidth < 800 && this.innerWidth > 400) {
      if (pageYOffset >= 221) {
        this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
        this.renderer2.addClass(this.el.nativeElement.querySelector('#body'), 'body-up');
        // this.renderer2.addClass(this.el.nativeElement.querySelector('#head'), 'header-change');
      } else {
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#body'), 'body-up');
        // this.renderer2.removeClass(this.el.nativeElement.querySelector('#head'), 'header-change');
      }
    }
    // console.log(pageYOffset);
    // console.log(innerWidth + 'page x');
  }
}
