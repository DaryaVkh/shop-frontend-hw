import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models';
import { CartProduct } from './cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly cartCount$ = new BehaviorSubject<number>(0);

  public readonly cart: CartProduct[] = [];

  public addToCart(product: Product, count: number): void {
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

  public decreaseProductCartCount(product: Product): void {
    const cartProduct = this.getCartProduct(product.id);
    if (cartProduct && cartProduct.count > 1) {
      cartProduct.count--;
      this.cartCount$.next(this.cartCount$.getValue() - 1);
    } else {
      this.removeFromCart(product.id);
    }
  }

  public getCartProductCount(productId: number): number {
    return this.getCartProduct(productId)?.count || 0;
  }

  private getCartProduct(productId: number): CartProduct | undefined {
    return this.cart.find((item) => item.id === productId);
  }

  private removeFromCart(productId: number): void {
    const index = this.cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartCount$.next(this.cartCount$.getValue() - 1);
    }
  }
}
