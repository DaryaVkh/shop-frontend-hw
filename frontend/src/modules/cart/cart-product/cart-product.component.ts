import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { skip, Subject, takeUntil } from 'rxjs';
import { CartProduct } from '../cart.models';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartProductComponent implements OnInit, OnDestroy {
  @Input() cartProduct!: CartProduct;

  public readonly countControl = this.fb.control(1);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly cartService: CartService) {
    this.countControl.valueChanges.pipe(
      skip(1),
      takeUntil(this.destroy$)
    ).subscribe((count) => {
      this.cartService.setCartCount(this.cartProduct, count ?? 0);
    });
  }

  public ngOnInit(): void {
    this.countControl.setValue(this.cartProduct.count);
  }

  public deleteFromCart(): void {
    this.cartService.removeFromCart(this.cartProduct.id);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
