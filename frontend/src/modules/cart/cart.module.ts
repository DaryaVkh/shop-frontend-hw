import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ConvertCaseModule } from '../../pipes/convert-case/convert-case.module';
import { CartComponent } from './cart.component';
import { CartFormComponent } from './cart-form/cart-form.component';
import { CartProductComponent } from './cart-product/cart-product.component';



@NgModule({
  declarations: [
    CartComponent,
    CartFormComponent,
    CartProductComponent
  ],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    ConvertCaseModule,
    TuiTextfieldControllerModule
  ]
})
export class CartModule { }
