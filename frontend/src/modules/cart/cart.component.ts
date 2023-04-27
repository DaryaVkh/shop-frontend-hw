import { ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyRate } from '../../shared/models';
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
  private readonly rate$ = new BehaviorSubject<CurrencyRate>({
    rate: {
      'USD': 1
    }
  });

  public readonly cartProducts = this.cartService.cart;

  public readonly totalSum$ = combineLatest([this.rate$, this.cartService.totalSum$]).pipe(
    map(([rate, sum]) => sum * Object.values(rate.rate)[0])
  );
  public readonly countryCode$ = this.rate$.pipe(
    map((rate) => Object.keys(rate.rate)[0])
  );

  constructor(private readonly mainService: MainService,
              private readonly cartService: CartService) {}

  public backToProductsListPage(): void {
    this.mainService.changePage(AppPage.PRODUCT_LIST);
  }

  changeRate(rate: CurrencyRate) {
    this.rate$.next(rate);
  }
}
