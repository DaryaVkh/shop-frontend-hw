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

  public addProductToCart(product: Product, count: number): void {
    this.cartService.increaseCartCount(product, count);
  }
}
