import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartFormComponent implements OnInit {

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
