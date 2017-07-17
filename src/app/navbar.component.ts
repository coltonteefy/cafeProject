import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';

import 'rxjs/add/observable/timer';
import {Observable} from 'rxjs/Observable';
import {CartService} from './cart.service';
import {Cart} from './cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [CartService]
})
export class NavbarComponent implements OnInit, OnDestroy {


  private timer;
  private LOGO = './assets/upsLogo.gif';
  i = 0;
  foodPics = [
    // grilled chicken and sandwich
    'http://www.cincinnatimagazine.com/wp-content/uploads/sites/20/2015/03/CM_MAR15_FEATURE_T10_ABI1-e1425438722184.jpg',
    // waffles
    'http://thenewlywedscookbook.com/wp-content/uploads/2015/01/homemade-blueberry-sauce-3-1000x600.jpg',
    // sandwich pile
    'https://static1.squarespace.com/static/55d25e52e4b075ba97049c9c/' +
    '55d2786fe4b0ac4433e4c8cd/560aa0cde4b020611706a74a/1443537105903/panini-stack-min.jpg',
    // sandwich and pasta
    'http://cmzone.vzbqbxhynotw9ion96xv.netdna-cdn.com/wp-content/uploads/2016/09/back-to-biz-lunch-boxes-hero.jpg',
    // above view chicken and strawberries
    'https://eatapp.co/dubai-restaurantsimages/cubano-lito-ibis-one-central-trade-centre-area-restaurant-5.jpg?width=1000&height=600',
    // pizza
    'http://www.graziellasmenu.com/pizza1000x600.jpg'
  ];
  currentPic = this.foodPics[this.i];
  cart: Cart;
  cartItems: Cart[];
  cartTotal = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.onResize();
    this.changePic();

    this.timer = Observable.timer(0, 5000).subscribe(t => {
      this.changePic();
    });


    this.cartService.changes
      .subscribe((data: any) => {
        this.cartItems = data.cart;
        this.cartTotal = data.cart.length;
      });

  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 574) {
      this.closeNav();
    }
  }

  changePic() {
    if (this.i >= (this.foodPics.length - 1)) {
      this.i = 0;
      this.currentPic = this.foodPics[this.i];
      // this.i = this.i + 1;
    } else {
      this.i = this.i + 1;
    }
    this.currentPic = this.foodPics[this.i];
  }

  scrollWin() {
    if (innerWidth > 400) {
      window.scrollTo(0, 525);
    } else {
      window.scrollTo(0, 0);
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('mySidenav').style.visibility = 'visible';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('mySidenav').style.visibility = 'none';
  }
}
