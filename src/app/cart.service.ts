import { Injectable } from '@angular/core';

import { Cart } from './cart';
import { CART } from './mock-cart-items';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

//read:
//https://angularclass.com/blog/create-a-simple-reactive-store-for-angular-2/
const _store = new BehaviorSubject({cart:[]});

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

  deleteFromCart(index: number) {
    let current = Object.assign({}, this.getState());
    current.cart.splice(index,1);

    this.setState(current);
  }

}


export class State {
  cart: any[] = [];
}
