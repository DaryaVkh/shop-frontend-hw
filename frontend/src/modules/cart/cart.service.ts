import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../shared/models';
import { CartProduct } from './cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly cartCount$ = new BehaviorSubject<number>(0);
  public readonly totalSum$ = this.cartCount$.pipe(
    map(() => this.cart.reduce((sum, item) => {
      return sum + item.count * item.price;
    }, 0))
  );

  public readonly cart: CartProduct[] = [];

  public increaseCartCount(product: Product, count: number): void {
    const cartProduct = this.getCartProduct(product.id);
    if (cartProduct) {
      cartProduct.count += count;
    } else {
      this.cart.push({
        ...product,
        count
      });
    }
    this.cartCount$.next(this.cartCount$.getValue() + count);
  }

  public setCartCount(product: Product, count: number): void {
    const cartProduct = this.getCartProduct(product.id);
    if (cartProduct) {
      const prevCount = cartProduct.count;
      cartProduct.count = count;
      this.cartCount$.next(this.cartCount$.getValue() - prevCount + count);
    }
  }

  private getCartProduct(productId: number): CartProduct | undefined {
    return this.cart.find((item) => item.id === productId);
  }

  public removeFromCart(productId: number): void {
    const product = this.getCartProduct(productId);
    const index = this.cart.findIndex((item) => item.id === productId)
    if (product) {
      this.cart.splice(index, 1);
      this.cartCount$.next(this.cartCount$.getValue() - product.count);
    }
  }
}
