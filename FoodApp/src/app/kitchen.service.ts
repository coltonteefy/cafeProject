import {Injectable} from '@angular/core';

import {Kitchen} from "./kitchen";
import {KITCHEN} from "./mock-kitchen-items";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

const _store = new BehaviorSubject({kitchen: [], total: 0, saleTax: 0});

@Injectable()
export class KitchenService {
  store: BehaviorSubject<any> = _store;
  changes: Observable<any>;

  constructor() {
    this.changes = this.store.asObservable();

    this.getKitchen().then(res => {
      this.setState({kitchen: res});
    })
  }

  getState(): any {
    return this.store.getValue()
  }

  setState(kitchenObj: any): any {
    const newState = this.addCost(kitchenObj);
    this.store.next(newState);
  }

  getKitchen(): Promise<Kitchen[]> {
    return Promise.resolve(KITCHEN);
  }

  clearKitchenOrder() {
    let current = Object.assign({}, this.getState());
    for (let i = current.kitchen.length; i > 0; --i) {
      current.kitchen.pop();
    }
    this.setState(current);
  }

  addToKitchen(newItem: any) {
    let current = Object.assign({}, this.getState());
    current.kitchen.push(newItem);

    this.setState(current);
  }

  deleteFromKitchen(id: any) {
    let current = Object.assign({}, this.getState());

    for (let i = 0; i < current.kitchen.length; i++) {
      if (id === current.kitchen[i].id)
        current.kitchen.splice(i, 1);
    }
    this.setState(current);
  }

  addCost(newState): any {
    let total = 0;
    if (newState.kitchen.length > 0) {
      total = newState.kitchen
        .map(item => item.price)
        .reduce((prev, curr) => prev + curr);
    }
    newState.total = total;
    return newState;
  }
}

export class State {
  kitchen: any[] = [];
}
