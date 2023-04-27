import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { AppPage } from './main.models';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  public readonly cartCount$ = this.cartService.cartCount$;
  public readonly page$ = this.mainService.page$;

  public readonly appPageEnum = AppPage;

  constructor(private readonly mainService: MainService,
              private readonly cartService: CartService) {}

  public changePage(newPage: AppPage): void {
    this.mainService.changePage(newPage);
  }
}
