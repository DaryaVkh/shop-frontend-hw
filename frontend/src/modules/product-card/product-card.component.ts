import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnDestroy {
  @Input() public product!: Product;
  @Input() public count = 0;

  @Output() addedToCart = new EventEmitter<number>();

  public readonly countControl = this.fb.control(1);

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly fb: FormBuilder,
              @Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  public addToCart(): void {
    this.alerts.open(`Product ${this.product.title} has been successfully added to cart!`).pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe();
    this.addedToCart.emit(this.countControl.value || 0);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
