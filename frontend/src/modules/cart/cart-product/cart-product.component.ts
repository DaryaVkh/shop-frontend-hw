import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { startWith, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartProduct } from '../cart.models';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartProductComponent implements OnInit {
  @Input() cartProduct!: CartProduct;

  public readonly countControl = this.fb.control(1);

  public readonly sum$ = this.countControl.valueChanges.pipe(
    startWith(1),
    map((count) => (count || 1) * this.cartProduct.price)
  );

  constructor(private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.countControl.setValue(this.cartProduct.count);
  }
}
