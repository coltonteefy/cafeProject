import {Injectable} from '@angular/core';

import {Cart} from './cart';
import {CART} from './mock-cart-items';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

//                        read for more info
//  https://angularclass.com/blog/create-a-simple-reactive-store-for-angular-2/
const _store = new BehaviorSubject({cart: [], total: 0, saleTax:0});

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
    const newState = this.addCost(cartObj);
    this.store.next(newState);
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

  addCost(newState): any {
    let total = 0;
    if (newState.cart.length > 0) {
      total = newState.cart
        .map(item => item.price)
        .reduce((prev, curr) => prev + curr);
    }
    newState.total = total;
    return newState;
  }
}

export class State {
  cart: any[] = [];
}
