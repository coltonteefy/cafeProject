import {Injectable} from '@angular/core';

import {Cart} from './cart';
import {CART} from './mock-cart-items';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

//read:
//https://angularclass.com/blog/create-a-simple-reactive-store-for-angular-2/
const _store = new BehaviorSubject({cart: []});

@Injectable()
export class CartService {
  store: BehaviorSubject<any> = _store;
  changes: Observable<any>;

  constructor() {
    this.changes = this.store.asObservable();

    this.getCart().then(res => {
      this.setState({cart: res});
    })
  }

  getState(): any {
    return this.store.getValue()
  }

  setState(cartObj: any): any {
    this.store.next(cartObj);
  }

  getCart(): Promise<Cart[]> {
    return Promise.resolve(CART);
  }

  addToCart(newItem: any) {
    let current = Object.assign({}, this.getState());
    current.cart.push(newItem);

    this.setState(current);
  }

  deleteFromCart(id: any) {
    let current = Object.assign({}, this.getState());
    // console.log(current.cart[0]);

    console.log("new click");
    for (let i = 0; i < current.cart.length; i++) {
      if (id !== current.cart[i].id) {
        // console.log(current.cart[id]);
      }

      if (id === current.cart[i].id) {
        console.log(current.cart[id]);
        current.cart.splice(i, 1);
      }
    }
  }
}

export class State {
  cart: any[] = [];
}
