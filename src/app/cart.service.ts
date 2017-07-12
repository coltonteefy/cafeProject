import {Injectable} from '@angular/core';

import {Cart} from './cart';
import {CART} from './mock-cart-items';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

//                        read for more info
//  https://angularclass.com/blog/create-a-simple-reactive-store-for-angular-2/
const _store = new BehaviorSubject({cart: [], totalSum: 0});

@Injectable()
export class CartService {
  store: BehaviorSubject<any> = _store;
  changes: Observable<any>;
  totalSum = 0;

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

  clearOrder() {
    let current = Object.assign({}, this.getState());

    console.log(current.cart.length);
    for (let i = current.cart.length; i > 0; --i) {
      current.cart.pop();
    }
    this.setState(current);
  }

  addToCart(newItem: any) {
    let current = Object.assign({}, this.getState());
    current.cart.push(newItem);

    this.setState(current);
  }

  deleteFromCart(id: any) {
    let current = Object.assign({}, this.getState());

    for (let i = 0; i < current.cart.length; i++) {
      if (id === current.cart[i].id)
        current.cart.splice(i, 1);

    }
    this.setState(current);
  }

  addCost(id: number) {
    let current = Object.assign({}, this.getState());
    // this.totalSum = Math.round((this.totalSum + current.cart[id].price) * 100) / 100;
    current.totalSum = Math.round((current.totalSum + current.cart[id].price) * 100) / 100;
    console.log(current.totalSum);

    this.setState(current);
  }

  getTotal() {
    return this.totalSum;
  }

}

export class State {
  cart: any[] = [];
  totalSum: number;
}
