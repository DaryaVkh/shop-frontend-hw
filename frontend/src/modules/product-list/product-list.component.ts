import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsApiService } from '../../services/products-api.service';
import { Product } from '../../shared/models';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  public readonly products$ = this.productsService.getProducts();

  constructor(private readonly productsService: ProductsApiService,
              private readonly cartService: CartService) {}

  public getCartProductCount(productId: number): number {
    return this.cartService.getCartProductCount(productId);
  }

  public addProductToCart(product: Product, count: number): void {
    this.cartService.addToCart(product, count);
  }

  public decreaseProductCartCount(product: Product): void {
    this.cartService.decreaseProductCartCount(product);
  }
}
