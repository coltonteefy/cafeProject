import { Injectable } from '@angular/core';

import { Cart } from './cart';
import { CART } from './mock-cart-items';

@Injectable()
export class CartService {
  getCart(): Promise<Cart[]> {
    return Promise.resolve(CART);
  }
}
