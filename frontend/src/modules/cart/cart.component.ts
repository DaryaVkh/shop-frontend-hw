import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppPage } from '../main/main.models';
import { MainService } from '../main/main.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public readonly cartProducts = this.cartService.cart;

  constructor(private readonly mainService: MainService,
              private readonly cartService: CartService) {}

  public backToProductsListPage(): void {
    this.mainService.changePage(AppPage.PRODUCT_LIST);
  }
}
